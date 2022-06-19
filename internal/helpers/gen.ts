/**
 * Author: kanno
 * Generator full esm named exports.
 *
 * @example
 *  export * from './module'
 */
import fs from 'fs'
import path from 'path'
import { init, parse } from 'es-module-lexer'

export const gen = async (root = process.cwd(), ignoredDirectories: string[] = []) => {
  ignoredDirectories = ignoredDirectories.map((dir) => {
    if (path.isAbsolute(dir)) return dir
    return path.join(root, dir)
  })

  const directories = await Promise.all(
    (
      await fs.promises.readdir(root)
    )
      .map((dir) => path.join(root, dir))
      .filter((subPath) => {
        if (fs.statSync(subPath).isDirectory()) {
          return !ignoredDirectories.includes(subPath)
        }
        return false
      })
  )

  const relatives = directories.reduce((acc: string[], cur: string) => {
    const relative = `./${path.relative(root, cur)}`
    acc.push(relative)
    return acc
  }, [])

  const parserd = relatives.reduce((acc, cur) => (acc += `export * from '${cur}';\n`), '')

  return { parserd, directories, relatives }
}

export const genExports = async (dict: string[], condit = 'default') => {
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

export const genVuePackageMeta = async (root = process.cwd(), ignoredDirectories: string[] = [], version = '0.0.0') => {
  const { parserd, directories, relatives } = await gen(root, ignoredDirectories)

  const namedExports = await genExports(directories)

  const str = namedExports.reduce((acc, cur, i) => {
    const moudle = `import {${cur.join()}} from '${relatives[i]}';\n`
    return (acc += moudle)
  }, '')

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
    components.map((component:any) => {
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
