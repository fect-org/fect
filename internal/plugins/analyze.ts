import type { Plugin } from 'rollup'
import { isScript, isStyle, replaceStyleInJs } from '../shared'

export const analyze = (): Plugin => {
  return {
    name: 'rollup-plugin-analyze',
    transform(code, id) {
      if (isStyle(id)) {
      }
      if (isScript(id)) {
        return {
          code: replaceStyleInJs(code)
        }
      }
    }
  }
}
