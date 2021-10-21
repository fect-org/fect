/**
 * collect all file from packages
 */

import fs from 'fs-extra'
import path from 'path'

const packagePath = path.join(__dirname, '../packages')
const resolvePath = path.join(packagePath, './index.ts')

/**
 * replace system keyword
 */
const replaces = ['default', 'function', 'package', 'delete']

const importTemp = `
   import {App} from 'vue';\n`

const installTemp = `const install =(app:App)=>{
   components.forEach((c:any) => {
     if (c.install) {
       app.use(c);
     } else if (c.name) {
       app.component(c.name, c);
     }
   });
 };\n
 export { install };\n
 export default { install }\n
 `

export default (async () => {
  const files = await fs.readdir(packagePath)
  const name = files
    .filter((v) => v !== 'index.ts')
    .map((file) => file.replace(/.tsx/, ''))
    .map((v) => (replaces.includes(v) ? `_${v}` : v))
  // .filter((n) => (n.includes(replaces) ? `_${n}` : n))
  const imports = name.map((i) => `import ${i} from './${i.replace(/_/, ' ').trim()}';\n`).join(' ')

  const components = `const components = [${name}];\n`
  const exports = `export {${name}};\n`
  const outer = importTemp + imports + components + installTemp + exports
  await fs.outputFile(resolvePath, outer)
})()
