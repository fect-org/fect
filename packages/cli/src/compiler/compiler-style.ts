import { render } from 'less'
import { readFileSync, writeFileSync, removeSync } from 'fs-extra'
import { replaceExt } from '../shared/constant'

/**
 * see less docs :https://lesscss.org/usage/
 */

export const compileLess = async (filePath: string) => {
  const source = readFileSync(filePath, 'utf-8')
  const { css } = await render(source, { filename: filePath })
  return css
}

export const compilerStyle = async (filePath: string) => {
  try {
    if (filePath.endsWith('.less')) {
      const css = await compileLess(filePath)
      writeFileSync(replaceExt(filePath, '.css'), css)
    }
    return removeSync(filePath)
  } catch (error) {
    console.log(`Compile style failed at: ${filePath}`)
    throw error
  }
}
