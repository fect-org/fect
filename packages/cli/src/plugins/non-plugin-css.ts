import { replaceExt, isStyle } from '../shared/constant'
import { render } from 'less'
import { logErr } from '../shared/logger'
import CleanCss from 'clean-css'
import postcss from 'postcss'
import type { Plugin } from '../node/_compile'

const cleanCss = new CleanCss()

const _transformCss = async (styleRaw: string) => {
  const { css } = await postcss([require('autoprefixer')]).process(styleRaw, { from: undefined })
  return cleanCss.minify(css).styles
}

const transformLess = async (styleRaw: string, fileName: string) => {
  const { css } = await render(styleRaw, { filename: fileName })
  return {
    code: css
  }
}

export const transformCss = (): Plugin => {
  let code = ''
  return {
    name: 'non-plugin-css',
    async transform(stdin, id) {
      if (!isStyle(id)) return
      try {
        if (id.endsWith('.less')) {
          ;({ code } = await transformLess(stdin, id))
        }
        const style = await _transformCss(code)
        return { id: replaceExt(id, '.css'), stdout: style }
      } catch (error) {
        logErr(error)
      }
    }
  }
}
