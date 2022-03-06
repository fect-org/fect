import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { build } from 'vite'
import { isPlainObject } from 'lodash'
import { resolveConfig } from './config'
import { ESM_PATH, CJS_PATH, setBabelEnv, DECLARATION_PATH, setNodeENV } from '../shared/constant'
import { logErr } from '../shared/logger'
import { execa } from '../shared/execa'
import { useUMDconfig } from '../config/vite.config'

import { bundle } from './_compile'

import { transformScript } from '../plugins/non-plugin-script'
import { transformCss } from '../plugins/non-plugin-css'
import { analyzeStyleDeps } from '../plugins/non-plugin-analyze-style'
import { transformDeps } from '../plugins/non-plugin-deps-trans'

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

export const declarationTask = async (input) => {
  const declaration = await fs.readFile(DECLARATION_PATH)
  const resolvePath = path.join(input, 'tsconfig.json')
  fs.outputFileSync(resolvePath, declaration)
  await execa('tsc', ['-p', resolvePath])
  await fs.unlink(resolvePath)
}

const cjsTask = async (input, reg) => {
  const cjs = await bundle({
    input,
    plugins: [transformScript({ babelEnv: 'commonjs' }), transformCss(), analyzeStyleDeps({ reg }), transformDeps()]
  })
  await cjs.write({ dir: CJS_PATH })
}

const esmTask = async (input, reg) => {
  const cjs = await bundle({
    input,
    plugins: [transformScript({ babelEnv: 'esmodule' }), transformCss(), analyzeStyleDeps({ reg }), transformDeps()]
  })
  await cjs.write({ dir: ESM_PATH })
}

export const compile = async () => {
  setNodeENV('production')
  const { userConfig, path: configPath } = await resolveConfig()
  const { lib } = userConfig
  if (!isPlainObject(lib)) {
    return logErr(`[Non Error!] you can not use it when your un set library in your config at ${configPath}`)
  }

  const { format, name, input } = lib

  const components = fs
    .readdirSync(input)
    .filter((v) => v !== 'utils')
    .map((_) => {
      _ = _.replace(/\-(\w)/g, (_, k: string) => k.toUpperCase())
      _ = _.charAt(0).toUpperCase() + _.slice(1)
      return _
    })

  await runTask('CommonJs', () => cjsTask(input, components))
  await runTask('EsModule', () => esmTask(input, components))
  if (format === 'umd' || format.includes('umd')) {
    await runTask('UMD', () => umdTask(input, name))
  }
  await runTask('Declaration', () => declarationTask(input))
}
