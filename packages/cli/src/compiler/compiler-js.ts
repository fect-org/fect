import { readFile, removeSync, outputFileSync } from 'fs-extra'
import { replaceExt } from '../shared/constant'
import { transformAsync } from '@babel/core'

export const compilerJs = async (filePath: string) => {
  try {
    const code = await readFile(filePath, 'utf8')
    const res = await transformAsync(code, { filename: filePath })
    const jsFilePath = replaceExt(filePath, '.js')
    removeSync(filePath)
    outputFileSync(jsFilePath, res.code)
  } catch (error) {
    throw error
  }
}
