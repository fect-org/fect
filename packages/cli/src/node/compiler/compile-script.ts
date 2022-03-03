import { isJsx } from '../../shared/constant'
import { transformAsync } from '@babel/core'
import { transform as esbuildTransform } from 'esbuild'
import { logErr } from '../../shared/logger'

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
