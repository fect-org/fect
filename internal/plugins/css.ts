import type { Plugin } from 'rollup'
import { isStyle, normalizePath } from '../shared'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from 'less'
import postcss from 'postcss'
import CleanCss from 'clean-css'
import path from 'path'

const transformCss = async (styleRaw: string, clean: CleanCss.MinifierOutput) => {
  const { css } = await postcss([require('autoprefixer')]).process(styleRaw, { from: undefined })
  return clean.minify(css).styles
}

const transformLess = async (styleRaw: string, fileName: string) => {
  const { css } = await render(styleRaw, { filename: fileName })
  return {
    code: css
  }
}

export const css = (): Plugin => {
  const clean = new CleanCss()
  const styles = new Map<
    string,
    {
      code: string
      id: string
    }
  >()

  return {
    name: 'rollup-plugin-css',
    async transform(code: string, id: string) {
      if (!isStyle(id)) return
      try {
        if (id.endsWith('.less')) {
          const r = await transformLess(code, id)
          // eslint-disable-next-line prefer-destructuring
          code = r.code
        }
        code = await transformCss(code, clean)
        const parent = normalizePath(path.dirname(id)).split('/').pop() || ''
        styles.set(parent, {
          code,
          id
        })
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: { mappings: '' }
        }
      } catch (error) {
        console.log(error)
      }
    },
    generateBundle() {
      styles.forEach((v, k) => {
        const dest = path.basename(v.id, path.extname(v.id))
        this.emitFile({ type: 'asset', fileName: `${k}/${dest}.css`, source: v.code })
      })
    }
  }
}
