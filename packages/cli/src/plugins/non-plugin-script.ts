import { logErr } from '../shared/logger'
import { replaceStyleInJs, replaceExt, isScript, setBabelEnv, isJsx } from '../shared/constant'
import type { Plugin } from '../node/_compile'
import { transformAsync } from '@babel/core'
import { transform as esbuildTransform } from 'esbuild'

interface TransformScriptOptions {
  babelEnv: ReturnType<typeof setBabelEnv>
}

const _transformScript = async (stdin: string, id: string) => {
  let code = replaceStyleInJs(stdin)
  if (isJsx(id)) {
    const res = await transformAsync(code, { filename: id })
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
}

export const transformScript = (config = {} as TransformScriptOptions): Plugin => {
  const { babelEnv = 'esmodule' } = config
  setBabelEnv(babelEnv)
  return {
    name: 'non-plugin-script',
    async transform(stdin, id) {
      if (!isScript(id)) return
      try {
        const { code } = await _transformScript(stdin, id)
        return { id: replaceExt(id, '.js'), stdout: code }
      } catch (error) {
        logErr(error)
      }
    }
  }
}
