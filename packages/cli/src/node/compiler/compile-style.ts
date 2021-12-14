/**
 * less docs :https://lesscss.org/usage/
 */

import fs from 'fs'
import { render } from 'less'
import { replaceExt } from '../../shared/constant'
import { logErr } from '../../shared/logger'

export const resolveStyleFile = async (filePath: string) => {
  try {
    let resolvePath
    let styleRaw: string
    if (filePath.endsWith('.less')) {
      styleRaw = await fs.promises.readFile(filePath, 'utf-8')
      const { code } = await transformLess(styleRaw, filePath)
      resolvePath = replaceExt(filePath, '.css')
      fs.writeFileSync(resolvePath, code)
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    logErr(`Compile style failed at: ${filePath}`)
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
