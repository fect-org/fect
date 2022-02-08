import fs from 'fs-extra'
import path from 'path'
import { init, parse } from 'es-module-lexer'
import { normalizePath, USER_PACKAGES_JSON_PATH } from '../shared/constant'
import { resolveConfig } from './config'
import { formatCode } from '../shared/format'

const IGNORE_DIR = ['utils', 'index.ts']

export const genPackagesEntry = async () => {
  const { userConfig } = await resolveConfig()
  const pkgPath = userConfig.lib.input
  const outPut = path.join(pkgPath, 'index.ts')

  const { version } = fs.readJsonSync(USER_PACKAGES_JSON_PATH)
  const dirs = fs.readdirSync(pkgPath).filter((_) => !IGNORE_DIR.includes(_))

  let content = `
   const version = '${version}';\n
   import {App} from 'vue';\n
  `
  let expts = ''

  const components = []

  await init
  dirs.forEach((dir) => {
    const copPath = path.join(pkgPath, dir, 'index.ts')
    const code = fs.readFileSync(copPath, 'utf-8')
    const [, exports] = parse(code)
    const expt = exports.filter((_) => _ !== 'default')
    const relativePath = `./${normalizePath(path.relative(pkgPath, path.join(pkgPath, dir)))}`
    components.push(expt.join())
    content += `import {${expt.join()}} from '${relativePath}';\n`
    expts += `export * from '${relativePath}';\n`
    return
  })

  content += `const components =[${components}];\n
  
      const install = (app:App) => {
        components.map((component:any) => {
          if (component.install) {
            app.use(component)
          } else if(component.name) {
            app.component(component.name , component)
          }
        })
      };\n
  
  `
  content += `${expts};\n
  
      export * from './utils/composables';\n

      export {
        install,
        version
      };

      export default {
        install,
        version,
      };
  

  `
  await fs.writeFile(outPut, formatCode(content))
}
