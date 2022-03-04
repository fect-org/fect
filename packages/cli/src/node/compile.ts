import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { build } from 'vite'
import { isPlainObject } from 'lodash'
import { resolveConfig } from './config'
import {
  ESM_PATH,
  isScript,
  isStyle,
  CJS_PATH,
  setBabelEnv,
  DECLARATION_PATH,
  setNodeENV,
  replaceStyleInJs,
  replaceExt
} from '../shared/constant'
import { logErr } from '../shared/logger'
import { execa } from '../shared/execa'
import { transform } from './compiler/compile-script'
import { transformLess, transofrmCss } from './compiler/compile-style'
import { analyzeDeps } from './compiler/externalize-style'
import { useUMDconfig } from '../config/vite.config'

import { Bundle } from './_compile'

const scriptTransform = async (files: Map<string, any>) => {
  const fileskeys = files.keys()
  for (const key of fileskeys) {
    const fileMeta = files.get(key)
    const { content, path: relativePath } = fileMeta
    const contentStr = replaceStyleInJs(content.toString())
    if (!isScript(relativePath)) continue
    if (path.dirname(relativePath).includes('style')) continue
    const { code } = await transform(contentStr, relativePath)
    files.set(key, Object.assign(fileMeta, { content: Buffer.from(code), path: replaceExt(relativePath, '.js') }))
  }
}

const styleTransform = async (files: Map<string, any>) => {
  const fileskeys = files.keys()
  let code: string
  for (const key of fileskeys) {
    const fileMeta = files.get(key)
    const { content, path: relativePath } = fileMeta
    const contentStr = content.toString()
    if (!isStyle(relativePath)) continue
    if (relativePath.endsWith('.less')) {
      ;({ code } = await transformLess(contentStr, relativePath))
    }
    const style = await transofrmCss(code)
    files.set(key, Object.assign(fileMeta, { content: Buffer.from(style), path: replaceExt(relativePath, '.css') }))
  }
}

const genStyleDeps = async (files: Map<string, any>, parrent: string) => {
  const fileskeys = files.keys()
  const components = fs
    .readdirSync(parrent)
    .filter((v) => v !== 'utils')
    .map((_) => {
      _ = _.replace(/\-(\w)/g, (_, k: string) => k.toUpperCase())
      _ = _.charAt(0).toUpperCase() + _.slice(1)
      return _
    })
  let styles = {}
  let jsonPaths = {}
  for (const key of fileskeys) {
    const fileMeta = files.get(key)
    const { content, path: relativePath } = fileMeta
    const contentStr = content.toString()
    if (!relativePath.endsWith('.tsx')) continue
    const { jsonPath, deps, componentName } = await analyzeDeps(contentStr, relativePath, files, parrent, components)
    if (styles[componentName]) {
      Object.assign(styles[componentName], deps)
    } else {
      styles[componentName] = deps
    }
    jsonPaths[jsonPath] = componentName
  }
  for (const key in jsonPaths) {
    files.set(key, {
      content: Buffer.from(JSON.stringify(styles[jsonPaths[key]])),
      path: path.relative(parrent, key)
    })
  }
  styles = null
  jsonPaths = null
}

const styleDepsTransform = async (files: Map<string, any>) => {
  const { BABEL_ENV } = process.env
  const fileskeys = files.keys()
  for (const key of fileskeys) {
    const fileMeta = files.get(key)
    const { content, path: relativePath } = fileMeta
    const contentStr = content.toString()
    if (!/\.(json)/g.test(relativePath)) continue
    const data = JSON.parse(contentStr)
    const styleStr = Object.keys(data).reduce((acc, cur) => {
      if (data[cur]) {
        if (BABEL_ENV === 'commonjs') {
          acc += `require("${data[cur]}");\n`
        } else {
          acc += `import "${data[cur]}";\n`
        }
      }
      return acc
    }, '')
    const output = path.join(path.dirname(relativePath), 'style', 'index.js')
    files.set(key, { content: Buffer.from(styleStr), path: output })
  }
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

const umdTask = async (input: string, name: string) => {
  setBabelEnv('esmodule')
  input = path.join(input, 'index.ts')
  await Promise.all([build(useUMDconfig(input, name, true)), build(useUMDconfig(input, name))])
}

const declarationTask = async (input) => {
  const declaration = await fs.readFile(DECLARATION_PATH)
  const resolvePath = path.join(input, 'tsconfig.json')
  fs.outputFileSync(resolvePath, declaration)
  await execa('tsc', ['-p', resolvePath])
  await fs.unlink(resolvePath)
}

const cjsTask = async (input) => {
  // cjs
  setBabelEnv('commonjs')
  const cjsTask = new Bundle({ parrents: input, dotFile: true })
  cjsTask.use(genStyleDeps).use(styleDepsTransform).use(scriptTransform).use(styleTransform)
  await cjsTask.process()
  await cjsTask.dest(CJS_PATH, { clean: true })
}

const esmTask = async (input) => {
  // esm
  setBabelEnv('esmodule')
  const esmTask = new Bundle({ parrents: input, dotFile: true })
  esmTask.use(genStyleDeps).use(styleDepsTransform).use(scriptTransform).use(styleTransform)
  await esmTask.process()
  await esmTask.dest(ESM_PATH, { clean: true })
}

export const compile = async () => {
  setNodeENV('production')
  const { userConfig, path: configPath } = await resolveConfig()
  const { lib } = userConfig
  if (!isPlainObject(lib)) {
    return logErr(`[Non Error!] you can not use it when your un set library in your config at ${configPath}`)
  }

  const { format, name, input } = lib
  await runTask('CommonJs', () => cjsTask(input))
  await runTask('EsModule', () => esmTask(input))
  if (format === 'umd' || format.includes('umd')) {
    await runTask('UMD', () => umdTask(input, name))
  }
  await runTask('Declaration', () => declarationTask(input))
}
