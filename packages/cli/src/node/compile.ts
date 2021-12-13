import fs, { removeSync } from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { resolveConfig } from './config'
import { logErr } from '../shared/logger'
import {
  NON_DEFAULT_PATH,
  ESM_PATH,
  TMP_PATH,
  isDir,
  isTestDir,
  isScript,
  isStyle,
  CJS_PATH,
  setBabelEnv,
  DECLARATION_PATH,
  setNodeENV
} from '../shared/constant'
import { execa } from '../shared/execa'
import type { Lib } from '../config/non.config'
import { resolveScriptFile } from './compiler/compile-script'
import { resolveStyleFile } from './compiler/compile-style'

export const resolveCompileConf = async () => {
  const { userConfig, path } = await resolveConfig()
  return {
    lib: userConfig.lib || false,
    path
  }
}

export const compileFile = async (filePath: string) => {
  if (isScript(filePath)) await resolveScriptFile(filePath)
  if (isStyle(filePath)) await resolveStyleFile(filePath)
}

export const compileDir = async (dir: string) => {
  const dirs = await fs.readdir(dir)
  await Promise.all(
    dirs.map((filename) => {
      const file = path.resolve(dir, filename)
      if (isTestDir(file)) return fs.removeSync(file)
      return compileFile(file)
    })
  )
}

const transform = async (entry) => {
  const moduleDir = await fs.readdir(entry)
  await Promise.all(
    moduleDir.map((fileName: string) => {
      const file = path.resolve(entry, fileName)
      try {
        return isDir(file) ? compileDir(file) : null
      } catch (error) {
        logErr(error)
      }
    })
  )
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

const declarationTask = async (input) => {
  const declaration = await fs.readFile(DECLARATION_PATH)
  const resolvePath = path.join(input, 'tsconfig.json')
  fs.outputFileSync(resolvePath, declaration)
  return new Promise((resolve) => {
    const stdout = execa('tsc', ['-p', resolvePath])
    stdout.on('exit', () => resolve(true))
  })
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
  if (!libOption)
    return logErr(`[Non Error!] you can not use it when your set library as false in your config at ${confPath}`)
  const { format, name, input } = libOption as Lib
  if (['default', 'umd'].includes(format) && !name)
    return logErr(`[Non Error!] "lib.name" is required when format include "umd" or "default"`)
  setNodeENV('production')
  await fs.copy(input, TMP_PATH)
  if (format === 'default') {
    await runTask('EsModule', () => esmTask(TMP_PATH))
    await runTask('CommonJs', () => cjsTask(TMP_PATH))
  }

  if (format === 'es') {
    await runTask('EsModule', () => esmTask(TMP_PATH))
  }

  if (format === 'cjs') {
    await runTask('CommonJs', () => cjsTask(TMP_PATH))
  }

  await runTask('Declaration', () => declarationTask(TMP_PATH))

  removeSync(TMP_PATH)
}
