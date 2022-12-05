/**
 * Author: kanno
 * Generator full esm named exports.
 *
 * @example
 *  export * from './module'
 */
import path from 'path'
import { init, parse } from 'es-module-lexer'
import fs from '../fs'
import { camelize } from './format'

interface PackageConfig {
  ignored?: string[]
  version?: string
  fileOnly?: boolean
}

export const gen = async (
  root = process.cwd(),
  {
    ignored = [],
    fileOnly = false
  }: {
    ignored?: string[]
    fileOnly?: boolean
  }
) => {
  const ignoredDirectories = ignored.map((dir) => {
    if (path.isAbsolute(dir)) return dir
    return path.join(root, dir)
  })
  let directories = await Promise.all(
    (
      await fs.promises.readdir(root)
    )
      .map((dir) => path.join(root, dir))
      .filter(async (subPath) => {
        const stats = await fs.promises.stat(subPath)
        if (fileOnly) return stats.isFile() && !ignoredDirectories.includes(subPath)
        return stats.isDirectory() && !ignoredDirectories.includes(subPath)
      })
  )
  if (fileOnly) {
    directories = directories.map((file) => file.split('.').slice(0, -1).join(''))
  }

  const relatives = directories.reduce((acc: string[], cur: string) => {
    const relative = `./${path.relative(root, cur)}`
    acc.push(relative)
    return acc
  }, [])

  const parserd = relatives.reduce((acc, cur) => {
    if (fileOnly) {
      const name = path.basename(cur).charAt(0).toLocaleLowerCase() + path.basename(cur).slice(1)
      return (acc += `export {default as ${camelize(`-${name}`)}} from '${cur}';\n`)
    }
    return (acc += `export * from '${cur}';\n`)
  }, '')

  return { parserd, directories, relatives }
}

export const genExports = async (dict: string[], options: { condit?: string; fileOnly?: boolean } = {}) => {
  const { condit = 'default', fileOnly = false } = options
  if (fileOnly) {
    return dict.map((d) => {
      const basename = path.basename(d)
      const finalName = basename.charAt(0).toLocaleLowerCase() + basename.slice(1)
      return camelize(`-${finalName}`)
    })
  }
  await init
  return dict.map((d) => {
    const moduleEntry = path.join(d, 'index.ts')
    const [, exports] = parse(fs.readFileSync(moduleEntry, 'utf-8'))
    return exports.filter((module) => module !== condit)
  })
}

/**
 * Generator vue component register info
 */

export const genVuePackageMeta = async (root = process.cwd(), options: PackageConfig) => {
  const { ignored = [], version = '0.0.0', fileOnly = false } = options
  const { parserd, directories, relatives } = await gen(root, { ignored, fileOnly })

  const namedExports = await genExports(directories, { fileOnly })

  const str = namedExports
    .map((item, i) => {
      const moudle = `import ${Array.isArray(item) ? `{${item.join()}}` : item}  from '${relatives[i]}';\n`
      return moudle
    })
    .join('\n')

  const flatMoudle = namedExports.flat()

  const banner = `
  const version ='${version}';\n
  import {App} from 'vue';\n
  `

  return (
    banner +
    str +
    `const components =[${flatMoudle}];\n
  
  const install = (app:App) => {
    components.forEach((component:any) => {
      if (component.install) {
        app.use(component)
      } else if(component.name) {
        app.component(component.name , component)
      }
    })
  };\n

  ${parserd}

  export {
    install,
    version
  }
  
  export default {
    install,
    version
  }
  `
  )
}
