import { transformLess, transofrmCss as _transformCss } from '../node/compiler/compile-style'
import { replaceExt, isStyle } from '../shared/constant'

export const transformCss = () => {
  let code = ''
  return {
    name: 'non-plugin-css',
    async transform(stdin: string, id: string) {
      if (!isStyle(id)) return
      if (id.endsWith('.less')) {
        ;({ code } = await transformLess(stdin, id))
      }
      const style = await _transformCss(code)
      return { id: replaceExt(id, '.css'), stdout: style }
    }
  }
}
