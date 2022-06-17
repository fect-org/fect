import { transformAsync } from '@babel/core'
import type { Plugin } from 'rollup'
import { replaceStyleInJs, isScript, isJsx } from '../shared'

const transformScript = async (code: string, id: string) => {
  // code = replaceStyleInJs(code)
  if (isJsx(id)) {
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
    if (res.code) {
      return { code: res.code, map: res.map }
    }
  }
  return { code: null, map: null }
}

export const jsx = (): Plugin => {
  return {
    name: 'rollup-plugin-jsx',
    async transform(code: string, id: string) {
      if (!isScript(id)) return null
      try {
        return await transformScript(code, id)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
