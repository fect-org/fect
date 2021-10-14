import { join } from 'path'
import { InlineConfig } from 'vite'
import { CWD, VITE_RESOLVE_EXTENSIONS, UMD_PATH, ESM_PATH } from '../../shared/constant'
import { getNonConf } from '../../shared/get-config'

export const useDevConfig = (): InlineConfig => {
  return {
    root: CWD,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: {},
    },
    server: {
      port: 5000,
    },
  }
}

// export const useSiteConfig = () => {}

/**
 * compile umd
 */

export const useUMDconfig = (mini = false): InlineConfig => {
  const name = getNonConf('name')
  return {
    logLevel: 'silent',
    build: {
      lib: {
        name,
        formats: ['umd'],
        fileName: mini ? `${name}.min` : `${name}`,
        entry: join(ESM_PATH, 'umd.js'),
      },
      minify: mini ? 'terser' : false,
      rollupOptions: {
        external: ['vue'],
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'main.css'
          },
          dir: UMD_PATH,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
}
