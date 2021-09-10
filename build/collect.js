/**
 * author :XeryYue
 * collect all component and create at packages/index.ts
 */

const { readdirSync, writeFile } = require('fs-extra')
const { join } = require('path')
const { PACKAGE_PATH } = require('./constant')

const output = join(PACKAGE_PATH, 'index.ts')

const IGNORE_DIR = ['utils', 'index.ts']

const PASCAL_REG = /(\w)(.+)/g

const genImport = (components, names) => {
  return components
    .map((name, idx) => `import ${name} from './${names[idx]}';`)
    .join('\n')
}

const genExport = (names) => names.map((name) => name).join(',\n  ')

;(async () => {
  const components = readdirSync(PACKAGE_PATH).filter(
    (dir) => !IGNORE_DIR.includes(dir),
  )

  // eg : avatar-group =>AvatarGroup
  const names = components.map((dir) =>
    dir
      .replace(PASCAL_REG, (_, k, k1) => k.toUpperCase() + k1)
      .replace(/-(\w)/g, (_, k) => k.toUpperCase()),
  )

  const content = `
   import '@fect-ui/themes';
   import {App} from 'vue';
   ${genImport(names, components)}
   const components = [${genExport(names)}];
   const install = (app:App) => {
     components.map((component:any) => {
       if (component.install) {
         app.use(component)
       } else if(component.name) {
         app.component(component.name , component)
       }
     })
   };

   export {
     install,
     ${genExport(names)}
   };

   export default {
     install,
   };

   `

  await writeFile(output, content)
})()
