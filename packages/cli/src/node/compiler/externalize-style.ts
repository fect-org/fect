import { readdirSync, pathExistsSync, outputJSONSync, readFileSync } from 'fs-extra'
import { extname, dirname, basename, join } from 'path'
import { isDir } from '../../shared/constant'
import { compileDir } from './compiler-dir'
import parser from 'parse-imports'

export const resolveExteranlStyle = async (path) => {
  const REG = /import .+ from .+()/g
  const IGNORE_DIR = ['utils', 'index.ts']

  const compoents = readdirSync(path).filter((_) => !IGNORE_DIR.includes(_))

  const componentNames = compoents.map((_) => {
    _ = _.replace(/\-(\w)/g, (_, k: string) => k.toUpperCase())
    _ = _.charAt(0).toUpperCase() + _.slice(1)
    return _
  })

  const styleDeps = {}

  const setDeps = async (filePath: string) => {
    if (!['.tsx'].includes(extname(filePath))) return
    if (IGNORE_DIR.includes(dirname(filePath))) return
    const dirPath = dirname(filePath)
    const component = basename(dirPath)
    const dirPathJson = join(dirPath, 'style.json')
    let code = readFileSync(filePath, 'utf-8')
    code = (code.match(REG) || []).join('\n')

    const stylePath = join(dirPath, 'index.less')
    const hasStyle = pathExistsSync(stylePath)
    const defaultStyle = hasStyle ? '../index.css' : ''
    styleDeps[component] = {
      ...styleDeps[component],
      [component]: defaultStyle
    }

    const imports = [...(await parser(code))]
    imports.forEach((item) => {
      if (item.importClause.default) {
        const depend = item.importClause.default
        if (componentNames.includes(depend)) {
          const depsPath = item.moduleSpecifier.value.slice(3)
          const depsStylePath = pathExistsSync(join(dirname(dirPath), depsPath, 'index.less'))
            ? `../../${depsPath}/index.css`
            : ''
          if (depsStylePath) {
            styleDeps[component] = {
              [depend]: depsStylePath,
              ...styleDeps[component]
            }
          }
        }
      }
      outputJSONSync(dirPathJson, styleDeps[component])
    })
  }

  const analyzeDeps = (component) => {
    const dir = join(path, component)
    if (!isDir(dir)) return
    compileDir(dir, setDeps)
  }
  await Promise.all(compoents.map((cop) => analyzeDeps(cop)))
}
