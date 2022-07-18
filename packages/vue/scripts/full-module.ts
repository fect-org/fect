/**
 * This file will generator umd bundle
 */

import { BuildTaskConfig } from 'internal'
import jsx from '@vitejs/plugin-vue-jsx'
import { build } from 'no-bump'
import { peerDependencies } from '../package.json'
import path from 'path'

const generatorFullConfigs = (mini = false): Omit<BuildTaskConfig, 'taskName'> => {
  return {
    input: 'src/index.ts',
    output: {
      format: 'umd',
      name: 'fect',
      file: mini ? 'fect.min.umd.js' : 'fect.umd.js',
      sourceMap: false,
      dir: 'dist/cjs',
      exports: 'named',
      minifiy: mini
    },
    plugins: {
      jsx
    },
    internalOptions: {
      plugins: {
        swc: {
          jsc: {
            target: 'es2017',
            externalHelpers: false
          }
        },
        postcss: {
          extract: path.resolve('dist/cjs/main.css'),
          minimize: true
        }
      }
    },
    external: [...Object.keys(peerDependencies)],
    global: {
      vue: 'Vue'
    }
  }
}

export const parlletlGeneratorFullBundle = async () => {
  const configs = [generatorFullConfigs(true), generatorFullConfigs()]

  await Promise.all(configs.map((conf) => build(conf)))
}
