import fs from 'fs-extra'
import path from 'path'

import parser from 'parse-imports'

const REG = /import .+ from .+()/g

import { normalizePath } from '../../shared/constant'

export const analyzeDeps = async (code: string, filePath: string, parrent, components: string[]) => {
  const sourcePath = normalizePath(parrent + '/' + filePath)
  const modules = (code.match(REG) || []).join('\n')
  const imports = [...(await parser(modules))]
  const dirPath = path.dirname(sourcePath)
  let depends = null
  let dependName = null
  imports.forEach((item) => {
    if (item.importClause.default) {
      const depend = item.importClause.default
      if (components.includes(depend)) {
        const depsPath = item.moduleSpecifier.value.slice(3)
        const virtualPath = normalizePath(path.join(parrent, '/', depsPath, 'index.less'))
        const depsStylePath = fs.pathExistsSync(virtualPath) ? `../../${depsPath}/index.css` : ''
        depends = depsStylePath
        dependName = depend
      }
    }
  })

  const virtualPath = normalizePath(path.join(dirPath, 'index.less'))
  const stylePath = fs.pathExistsSync(virtualPath) ? '../index.css' : ''
  const componentName = path.dirname(filePath)
  const jsonPath = normalizePath(path.join(dirPath, 'style.json'))

  return {
    jsonPath,
    componentName,
    deps: {
      [componentName]: stylePath,
      [dependName]: depends
    }
  }
}
