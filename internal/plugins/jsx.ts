import { transformAsync } from '@babel/core'
import type { Plugin } from 'rollup'
import { replaceStyleInJs, isScript, isJsx } from '../shared'

const transformScript = async (code: string, id: string) => {
  const res = await transformAsync(code, {
    babelrc: false,
    configFile: false,
    ast: true,
    sourceMaps: true,
    sourceFileName: id,
    filename: id,
    presets: ['@babel/preset-typescript'],
    plugins: [
      [
        '@vue/babel-plugin-jsx',
        {
          enableObjectSlots: false
        }
      ]
    ]
  })
  if (res) {
    const { code: trasnformCode, map } = res
    return { code: trasnformCode as string, map }
  }
}

export const jsx = (): Plugin => {
  return {
    name: 'rollup-plugin-jsx',
    async transform(code: string, id: string) {
      if (!isJsx(id)) return
      try {
        const r = await transformScript(code, id)
        return r
      } catch (error) {
        console.log(error)
      }
    }
  }
}
