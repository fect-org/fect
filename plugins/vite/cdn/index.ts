import type { Plugin, UserConfig } from 'vite'

interface TrackModule {
  name: string
  global: string
  spare?: string
}

export interface CDNOptions {
  isProduction?: boolean
  moudules?: Array<TrackModule>
}

const JSDELIVR_DOMAIN = 'https://cdn.jsdelivr.net/npm/'
const UNPKG_DOMAIN = 'https://unpkg.com/'

const tryRequireModule = (module: TrackModule): Required<TrackModule> => {
  const { name, global, spare } = module
  if (spare) return module as Required<TrackModule>
  const { version, jsdelivr, unpkg } = require(`${name}/package.json`)
  if (!jsdelivr && !unpkg) return { name, global, spare: '' }
  return {
    name,
    global,
    spare: `${jsdelivr ? JSDELIVR_DOMAIN : UNPKG_DOMAIN}${name}@${version}/${jsdelivr ? jsdelivr : unpkg}`
  }
}

const parserModuleImpl = (modules: Array<TrackModule>) => {
  //
  const finder: Map<string, { spare: string; global: string; name: string }> = new Map()
  modules.forEach((item) => {
    const { spare, name, global } = tryRequireModule(item)
    if (spare) {
      finder.set(name, { spare, global, name })
    }
  })
  return {
    finder
  }
}

export const cdn = (options: CDNOptions = {}): Plugin => {
  const { isProduction = false, moudules = [] } = options

  const { finder } = parserModuleImpl(moudules)

  return {
    name: 'internal-plugin',
    enforce: 'post',
    config(userConfig: UserConfig) {
      if ([...finder.keys()].length) {
        if (userConfig.build?.rollupOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { external: _, ...rest } = userConfig.build.rollupOptions
          userConfig.build.rollupOptions = { ...rest, external: [...finder.keys()] }
          const globals = [...finder.values()].reduce((acc, { global, name }) => {
            return Object.assign(acc, { [name]: global })
          }, {})
          if (!Array.isArray(userConfig.build.rollupOptions.output)) {
            userConfig.build.rollupOptions.output!.globals = globals
          }
        }
      }
      console.log(userConfig.build?.rollupOptions)
    },
    transformIndexHtml(raw: string) {
      if (!isProduction) return raw
    }
  }
}
