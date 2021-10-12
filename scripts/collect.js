/**
 * author :XeryYue
 * collect all component , package version . create at packages/index.ts
 */

const { version } = require('../package.json') // package  version
const { readdirSync, writeFile } = require('fs-extra')
const { join } = require('path')
const { PACKAGE_PATH } = require('./constant')

const output = join(PACKAGE_PATH, 'index.ts')

const IGNORE_DIR = ['utils', 'index.ts']

const PASCAL_REG = /(\w)(.+)/g

const genImport = (components, names) => {
  return components
    .map((name, idx) => `import { ${name} } from './${names[idx]}';`)
    .join('\n')
}

const genExport = (dirs) =>
  dirs.map((dir) => `export * from './${dir}';`).join('\n ')

;(async () => {
  // filter all component dirs
  const dirs = readdirSync(PACKAGE_PATH).filter((_) => !IGNORE_DIR.includes(_))

  // eg : avatar-group =>AvatarGroup
  const pascalNames = dirs.map((dir) => {
    return dir
      .replace(PASCAL_REG, (_, k, k1) => k.toUpperCase() + k1)
      .replace(/-(\w)/g, (_, k) => k.toUpperCase())
  })

  const content = `

  const version = '${version}' ;

   import '@fect-ui/themes';
   import {App} from 'vue';
   ${genImport(pascalNames, dirs)}
   const components = [${pascalNames.map((_) => _)}];
   const install = (app:App) => {
     components.map((component:any) => {
       if (component.install) {
         app.use(component)
       } else if(component.name) {
         app.component(component.name , component)
       }
     })
   };

   ${genExport(dirs)}

   export {
     install,
     version
   };

   export default {
     install,
     version,
   };

   `

  await writeFile(output, content)
})()
