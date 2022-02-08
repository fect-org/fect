import fs from 'fs'
import path from 'path'
import { CWD, normalizePath, NONRC_REG, NON_DEFAULT_PATH } from '../shared/constant'
import type { NonConfig } from '../config/non.config'
import { build } from 'esbuild'
import { merge } from 'lodash'
import { externalizeDeps } from '../external/externalize-deps'
import { logErr } from '../shared/logger'

export const defineNonConfig = (userConfig: NonConfig) => userConfig

export const getUserNonrc = (dir: string): string | null => {
  const nonList = fs
    .readdirSync(dir)
    .map((dir) => dir.match(NONRC_REG))
    .filter((v) => v)
    .flat()
  if (!nonList.length) return null
  return path.join(CWD, nonList[0])
}

export const loadConfigFromFile = async (configfile: string) => {
  let resolvePath: string
  if (configfile) {
    resolvePath = fs.existsSync(configfile) ? path.resolve(configfile) : NON_DEFAULT_PATH
  }
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
  const resolveRoot: string = normalizePath(CWD)
  /**
   * getUserNonrc may return null . Mean user don't set config file
   * so we should use default config file path.
   */
  const nonrc = getUserNonrc(resolveRoot) || NON_DEFAULT_PATH
  const loadResult = await loadConfigFromFile(nonrc)
  return loadResult && loadResult
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
