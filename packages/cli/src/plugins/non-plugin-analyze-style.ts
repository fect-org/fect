import path from 'path'
import { analyzeDeps } from '../node/compiler/externalize-style'

interface AnalyzeStyleDeps {
  reg: string[]
}

export const analyzeStyleDeps = (config: AnalyzeStyleDeps) => {
  const { reg } = config
  const styles = {}
  const jsonPaths = {}
  return {
    name: 'non-plugin-analyze-style',
    async transform(stdin: string, id: string, parrent: string) {
      if (!id.endsWith('.tsx')) return
      const { jsonPath, deps, componentName } = await analyzeDeps(stdin, id, parrent, reg)
      if (styles[componentName]) {
        Object.assign(styles[componentName], deps)
      } else {
        styles[componentName] = deps
      }
      jsonPaths[jsonPath] = componentName
      const parentkey = path.dirname(id)
      let jsonKey = ''
      for (const key in jsonPaths) {
        if (jsonPaths[key] === parentkey) {
          jsonKey = key
          break
        }
      }

      return {
        id: path.relative(parrent, jsonKey),
        stdout: JSON.stringify(styles[parentkey]),
        extra: jsonKey
      }
    }
  }
}
