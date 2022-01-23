import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { build } from 'vite'
import { resolveConfig } from './config'
import {
  NON_DEFAULT_PATH,
  ESM_PATH,
  TMP_PATH,
  isScript,
  isStyle,
  CJS_PATH,
  setBabelEnv,
  DECLARATION_PATH,
  setNodeENV,
  replaceStyleInJs
} from '../shared/constant'
import { logErr } from '../shared/logger'
import { execa } from '../shared/execa'
import type { Lib } from '../config/non.config'
import { resolveScriptFile } from './compiler/compile-script'
import { resolveStyleFile } from './compiler/compile-style'
import { compileDir } from './compiler/compiler-dir'
import { resolveExteranlStyle } from './compiler/externalize-style'
import { compileStyleDeps } from './compiler/compile-style-deps'
import { useUMDconfig } from '../config/vite.config'

export const removeCodeStyle = async (filePath: string) => {
  let code
  code = await fs.readFile(filePath, 'utf8')
  code = replaceStyleInJs(code, '')
  fs.outputFileSync(filePath, code)
  return
}

export const resolveCompileConf = async () => {
  const { userConfig, path } = await resolveConfig()
  return {
    lib: userConfig.lib || false,
    path
  }
}

export const compileFile = async (filePath: string) => {
  if (/\.(json)/g.test(filePath)) return compileStyleDeps(filePath)
  if (isScript(filePath)) await resolveScriptFile(filePath)
  if (isStyle(filePath)) await resolveStyleFile(filePath)
}

const transform = async (entry) => {
  try {
    await compileDir(entry, compileFile)
  } catch (error) {
    logErr(error)
  }
}

const cjsTask = async (input) => {
  setBabelEnv('commonjs')
  await fs.copy(input, CJS_PATH)

  await transform(CJS_PATH)
}

const esmTask = async (input) => {
  setBabelEnv('esmodule')
  await fs.copy(input, ESM_PATH)
  await transform(ESM_PATH)
}

const umdTask = async (input, name: string) => {
  setBabelEnv('esmodule')
  const entry = path.join(input, 'index.js')
  const entryRaw = fs.readFileSync(entry, 'utf-8')
  const umdJs = path.join(input, 'umd.js')
  const ignored = ['utils', 'index.js']
  const styleRaw = fs
    .readdirSync(input)
    .filter((v) => !ignored.includes(v))
    .map((file) => `import './${file}/style/index.js';\n`)
    .join()
    .replace(/,/g, '')
  const raw = `
   import '@fect-ui/themes'
   ${entryRaw}
   ${styleRaw}
  `
  fs.outputFileSync(umdJs, raw)
  await build(useUMDconfig(name, true))
  await build(useUMDconfig(name))
  fs.removeSync(umdJs)
}

const declarationTask = async (input) => {
  const declaration = await fs.readFile(DECLARATION_PATH)
  const resolvePath = path.join(input, 'tsconfig.json')
  fs.outputFileSync(resolvePath, declaration)
  await execa('tsc', ['-p', resolvePath])
}

export const runTask = async (taskName, task) => {
  const spinner = ora(`Build ${taskName} Outputs`).start()
  try {
    await task()
    spinner.succeed(`compile ${taskName} successed!`)
  } catch (error) {
    logErr(error)
    process.exit(1)
  }
}

export const compile = async () => {
  const { lib: libOption, path: confPath } = await resolveCompileConf()

  if (confPath === NON_DEFAULT_PATH) return
  if (!libOption) {
    return logErr(`[Non Error!] you can not use it when your set library as false in your config at ${confPath}`)
  }
  const { format, name, input } = libOption as Lib
  if (['default', 'umd'].includes(format) && !name) {
    return logErr('[Non Error!] "lib.name" is required when format include "umd" or "default"')
  }
  setNodeENV('production')
  await fs.copy(input, TMP_PATH)
  await compileDir(TMP_PATH, removeCodeStyle)
  await resolveExteranlStyle(TMP_PATH)

  if (format === 'default') {
    await runTask('EsModule', () => esmTask(TMP_PATH))
    await runTask('CommonJs', () => cjsTask(TMP_PATH))
    await runTask('UMD', () => umdTask(ESM_PATH, name))
  }

  if (format === 'es') {
    await runTask('EsModule', () => esmTask(TMP_PATH))
  }

  if (format === 'cjs') {
    await runTask('CommonJs', () => cjsTask(TMP_PATH))
  }

  if (format === 'noumd') {
    await runTask('EsModule', () => esmTask(TMP_PATH))
    await runTask('CommonJs', () => cjsTask(TMP_PATH))
  }

  await runTask('Declaration', () => declarationTask(TMP_PATH))

  fs.removeSync(TMP_PATH)
}
