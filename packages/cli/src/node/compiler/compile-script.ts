import fs from 'fs'
import { isJsx, replaceExt } from '../../shared/constant'
import { transformAsync } from '@babel/core'
import { transform as esbuildTransform } from 'esbuild'
import { logErr } from '../../shared/logger'

export const resolveScriptFile = async (filePath: string) => {
  try {
    const code = await fs.promises.readFile(filePath, 'utf-8')
    const raw = await transform(code, filePath)
    // const resolvedPath = replaceExt(filePath, '.js')
    // fs.unlinkSync(filePath)
    // fs.writeFileSync(resolvedPath, raw.code)
    return raw.code
  } catch (error) {
    logErr(error)
    throw error
  }
}

export const transform = async (source: string, fileName) => {
  try {
    let code = source
    if (isJsx(fileName)) {
      const res = await transformAsync(code, { filename: fileName })
      ;({ code } = res)
    }
    const esbuildResult = await esbuildTransform(code, {
      loader: 'ts',
      target: 'es2016',
      format: process.env.BABEL_ENV === 'esmodule' ? 'esm' : 'cjs'
    })
    return {
      code: esbuildResult.code
    }
  } catch (error) {
    logErr(error)
    throw error
  }
}
