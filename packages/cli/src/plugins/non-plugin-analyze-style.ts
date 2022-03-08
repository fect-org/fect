import path from 'path'
import { analyzeDeps } from '../node/compiler/externalize-style'

interface AnalyzeStyleDeps {
  reg: string[]
}

const transformStyleDpes = (styles: Record<string, string>) => {
  const { BABEL_ENV } = process.env
  return Object.keys(styles).reduce((acc, cur) => {
    if (styles[cur]) {
      if (BABEL_ENV === 'commonjs') {
        acc += `require("${styles[cur]}");\n`
      } else {
        acc += `import "${styles[cur]}";\n`
      }
    }
    return acc
  }, '')
}

export const analyzeStyleDeps = (config: AnalyzeStyleDeps) => {
  const { reg } = config
  return {
    name: 'non-plugin-analyze-style',
    async buildStart(files: Map<string, any>, parrent: string) {
      const styles = Object.create(null)
      const promises = []
      files.forEach((item, key) => {
        if (!key.endsWith('.tsx')) return
        const { content, path: relativePath } = item
        const contentStr = content.toString()
        promises.push(
          analyzeDeps(contentStr, relativePath, parrent, reg).then((res) => {
            const { jsonPath, deps } = res
            if (styles[jsonPath]) {
              styles[jsonPath] = Object.assign(styles[jsonPath], deps)
            } else {
              styles[jsonPath] = deps
            }
          })
        )
      })
      await Promise.all(promises)
      for (const key in styles) {
        const styleStr = transformStyleDpes(styles[key])
        const output = path.join(path.dirname(key), 'style', 'index.js')
        files.set(key, { content: Buffer.from(styleStr), path: path.relative(parrent, output) })
      }
    }
  }
}
