import { readdirSync, pathExistsSync, outputJSONSync, readFileSync } from 'fs-extra'
import { extname, dirname, basename, join } from 'path'
import { isDir, IMPORT_REG } from '../../shared/constant'
import { compileDir } from './compiler-dir'

export const resolveExteranlStyle = async (path) => {
  const IGNORE_DIR = ['utils', 'index.ts']
  const REG = /import (\w+) from/g
  const compoents = readdirSync(path).filter((_) => !IGNORE_DIR.includes(_))
  const styleDeps = {}

  const setDeps = (filePath: string) => {
    // only work on .tsx file as component
    if (!['.tsx'].includes(extname(filePath))) return
    const dirPath = dirname(filePath)

    const dirPathJson = join(dirPath, 'style.json')
    const component = basename(dirPath)
    const code = readFileSync(filePath, 'utf8')
    const imports = (filePath.endsWith('.tsx') && code.match(IMPORT_REG)) || []
    const stylePath = join(dirPath, 'index.less')
    const hasStyle = pathExistsSync(stylePath)
    const defaultStyle = hasStyle ? '../index.css' : ''
    styleDeps[component] = {
      ...styleDeps[component],
      [component]: defaultStyle
    }
    imports.map((_) => {
      // eslint-disable-next-line prefer-destructuring
      const deps = _.match(REG)
      if (deps) {
        const depsComponent = deps[0]
          .match(/\s\w+\s/g)[0]
          .replace(/\s/g, '')
          .replace(/[A-Z]/g, (_) => '-' + _)
          .toLowerCase()
          .substr(1)

        if (compoents.includes(depsComponent)) {
          styleDeps[component] = {
            [depsComponent]: `../../${depsComponent}/index.css`,
            ...styleDeps[component]
          }
        }
      }
    })
    outputJSONSync(dirPathJson, styleDeps[component])
  }

  const analyzeDeps = (component) => {
    const dir = join(path, component)
    if (!isDir(dir)) return
    compileDir(dir, setDeps)
  }
  await Promise.all(compoents.map((cop) => analyzeDeps(cop)))
}
