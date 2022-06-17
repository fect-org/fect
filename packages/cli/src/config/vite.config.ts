import { InlineConfig } from 'vite'
import { UMD_PATH } from '../shared/constant'

export const useUMDconfig = (input, name, mini = false): InlineConfig => {
  return {
    logLevel: 'silent',
    build: {
      lib: {
        name,
        formats: ['umd'],
        fileName: mini ? `${name}.min` : `${name}`,
        entry: input
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
