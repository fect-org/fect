/**
 * author :XeryYue
 * collect all component and create at packages/index.js
 */

const { readdirSync, writeFile } = require('fs-extra')
const { resolve } = require('path')

const packageEntry = resolve(__dirname, '../packages')
const resolvePath = resolve(packageEntry, './index.ts')
const IGNORE_DIR = ['utils', 'index.ts']

const PASCAL_REG = /(\w)(.+)/g

const genImport = (components, names) => {
  return components
    .map((name, idx) => `import ${name} from './${names[idx]}';`)
    .join('\n')
}

const genExport = (names) => names.map((name) => name).join(',\n  ')

;(async () => {
  const components = readdirSync(packageEntry).filter(
    (dir) => !IGNORE_DIR.includes(dir),
  )

  // eg : avatar-group =>AvatarGroup
  const names = components.map((dir) =>
    dir
      .replace(PASCAL_REG, (_, k, k1) => k.toUpperCase() + k1)
      .replace(/-(\w)/g, (_, k) => k.toUpperCase()),
  )

  const content = `
  import {App} from 'vue';
  import './utils/styles/index.css';
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

  await writeFile(resolvePath, content)
})()
