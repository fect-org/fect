import { join } from 'path'
import { InlineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import { CWD, VITE_RESOLVE_EXTENSIONS, UMD_PATH, ESM_PATH } from '../../shared/constant'
import { resolveConfig } from '../../node/config'

export const useDevConfig = async (): Promise<InlineConfig> => {
  const { userConfig } = await resolveConfig()
  const { port, plugins } = userConfig
  return {
    root: CWD,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: {}
    },
    server: {
      port
    },
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/]
      }),
      Jsx(),
      ...plugins
    ]
  }
}

export const useBuildConfig = async (): Promise<InlineConfig> => {
  const devConf = await useDevConfig()
  const { userConfig } = await resolveConfig()
  const { entry } = userConfig
  return {
    ...devConf,
    base: '/',
    mode: 'production',
    build: {
      sourcemap: false,
      brotliSize: false,
      rollupOptions: {
        input: { main: entry }
      }
    }
  }
}

/**
 * compile umd
 */

export const useUMDconfig = (name, mini = false): InlineConfig => {
  return {
    logLevel: 'silent',
    build: {
      lib: {
        name,
        formats: ['umd'],
        fileName: mini ? `${name}.min` : `${name}`,
        entry: join(ESM_PATH, 'umd.js')
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
            vue: 'Vue'
          }
        }
      }
    }
  }
}
