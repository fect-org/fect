/**
 * less docs :https://lesscss.org/usage/
 */

import { render } from 'less'
import postcss from 'postcss'
import { logErr } from '../../shared/logger'

import CleanCss from 'clean-css'
const cleanCss = new CleanCss()

export const transofrmCss = async (styleRaw: string) => {
  try {
    const { css } = await postcss([require('autoprefixer')]).process(styleRaw, { from: undefined })
    return cleanCss.minify(css).styles
  } catch (error) {
    logErr(error)
    throw error
  }
}

export const transformLess = async (styleRaw: string, fileName: string) => {
  try {
    const { css } = await render(styleRaw, { filename: fileName })
    return {
      code: css
    }
  } catch (error) {
    logErr(error)
    throw error
  }
}
