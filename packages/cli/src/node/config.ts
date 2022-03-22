import fs from 'fs'
import path from 'path'
import { CWD, NON_DEFAULT_PATH } from '../shared/constant'
import type { NonConfig } from '../config/non.config'
import { build } from 'esbuild'
import { merge } from 'lodash'
import { externalizeDeps } from '../plugins/externalize-deps'
import { logErr } from '../shared/logger'

export const defineNonConfig = (userConfig: NonConfig) => userConfig

export const loadConfigFromFile = async (root = CWD) => {
  let resolvePath: string | undefined

  const jsConfigFile = path.resolve(root, 'non.config.js')
  if (fs.existsSync(jsConfigFile)) {
    resolvePath = jsConfigFile
  }
  if (!resolvePath) {
    const tsConfigFile = path.resolve(root, 'non.config.ts')
    if (fs.existsSync(tsConfigFile)) {
      resolvePath = tsConfigFile
    }
  }

  if (!resolvePath) resolvePath = NON_DEFAULT_PATH

  try {
    let userConfig: NonConfig | undefined
    const bundled = await bundleConfigFile(resolvePath)
    userConfig = await loadConfigFromBundledFile(resolvePath, bundled.code)
    userConfig = mergeConfig(userConfig)
    return {
      userConfig,
      path: resolvePath
    }
  } catch (error) {
    logErr(error)
    throw error
  }
}

export const resolveConfig = async () => {
  const loadResult = await loadConfigFromFile()
  return loadResult
}

export const bundleConfigFile = async (filePath: string, esm = false) => {
  const bundle = await build({
    entryPoints: [filePath],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: esm ? 'esm' : 'cjs',
    metafile: true,
    plugins: [externalizeDeps]
  })
  // eslint-disable-next-line prefer-destructuring
  const { text } = bundle.outputFiles[0]
  return {
    code: text,
    dependencies: bundle.metafile ? Object.keys(bundle.metafile.inputs) : []
  }
}

export const mergeConfig = (userConfig: NonConfig) => {
  delete require.cache[require.resolve(NON_DEFAULT_PATH)]
  return merge(require(NON_DEFAULT_PATH).default, userConfig)
}

interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any
}

const loadConfigFromBundledFile = async (fileName: string, bundledCode: string): Promise<NonConfig> => {
  const extension = path.extname(fileName)
  const defaultLoader = require.extensions[extension]
  require.extensions[extension] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
    } else {
      defaultLoader(module, filename)
    }
  }
  delete require.cache[require.resolve(fileName)]
  const raw = require(fileName)
  const config = raw.__esModule ? raw.default : raw
  require.extensions[extension] = defaultLoader
  return config
}
