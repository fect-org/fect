import { transform } from '../node/compiler/compile-script'
import { replaceStyleInJs, replaceExt, isScript, setBabelEnv, normalizePath } from '../shared/constant'

interface TransformScriptOptions {
  babelEnv: ReturnType<typeof setBabelEnv>
}

export const transformScript = (config = {} as TransformScriptOptions) => {
  const { babelEnv = 'esmodule' } = config
  setBabelEnv(babelEnv)
  return {
    name: 'non-plugin-script',
    async transform(stdin, id: string, parrent: string) {
      if (!isScript(id)) return
      try {
        const { code } = await transform(replaceStyleInJs(stdin), id)
        return { id: replaceExt(id, '.js'), stdout: code, extra: normalizePath(`${parrent}/${id}`) }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
