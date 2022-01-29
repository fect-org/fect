/**
 * less docs :https://lesscss.org/usage/
 */

import fs from 'fs'
import { render } from 'less'
import postcss from 'postcss'
import { replaceExt } from '../../shared/constant'
import { logErr } from '../../shared/logger'

import CleanCss from 'clean-css'
const cleanCss = new CleanCss()

export const resolveStyleFile = async (filePath: string) => {
  try {
    let resolvePath
    let styleRaw: string
    if (filePath.endsWith('.less')) {
      styleRaw = await fs.promises.readFile(filePath, 'utf-8')
      const { code } = await transformLess(styleRaw, filePath)
      const style = await transofrmCss(code)
      resolvePath = replaceExt(filePath, '.css')
      fs.writeFileSync(resolvePath, style)
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    logErr(`Compile style failed at: ${filePath}`)
    throw error
  }
}

const transofrmCss = async (styleRaw: string) => {
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
