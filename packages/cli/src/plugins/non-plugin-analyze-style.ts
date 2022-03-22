import fs from 'fs-extra'
import path from 'path'
import parser from 'parse-imports'
import { normalizePath } from '../shared/constant'
import { Plugin } from '../node/_compile'

interface AnalyzeStyleDeps {
  reg: string[]
}

const REG = /import .+ from .+()/g

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

const analyzeDeps = async (code: string, filePath: string, parrent, components: string[]) => {
  const sourcePath = normalizePath(parrent + '/' + filePath)
  const modules = (code.match(REG) || []).join('\n')
  const imports = [...(await parser(modules))]
  const dirPath = path.dirname(sourcePath)
  const depends = []
  const dependName = []
  imports.map((item) => {
    if (item.importClause.default) {
      const depend = item.importClause.default
      if (components.includes(depend)) {
        const depsPath = item.moduleSpecifier.value.slice(3)
        const virtualPath = normalizePath(path.join(parrent, '/', depsPath, 'index.less'))
        const depsStylePath = fs.pathExistsSync(virtualPath) ? `../../${depsPath}/index.css` : ''
        depends.push(depsStylePath)
        dependName.push(depend)
      }
    }
  })

  const virtualPath = normalizePath(path.join(dirPath, 'index.less'))
  const stylePath = fs.pathExistsSync(virtualPath) ? '../index.css' : ''
  const componentName = path.dirname(filePath)
  const jsonPath = normalizePath(path.join(dirPath, 'style.json'))

  const deps = {
    [componentName]: stylePath
  }
  if (dependName.length && depends.length) {
    dependName.forEach((dep, idx) => {
      Object.assign(deps, {
        ...deps,
        [dep]: depends[idx]
      })
    })
  }

  return {
    jsonPath,
    deps
  }
}

export const analyzeStyleDeps = (config: AnalyzeStyleDeps): Plugin => {
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
