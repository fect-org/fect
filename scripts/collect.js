/**
 * author :XeryYue
 * collect all component and create at packages/index.js
 */

const fs = require('fs-extra')
const path = require('path')
const { compose, concat, filter, map } = require('./reducer')
const packagePath = path.join(__dirname, '../packages')
const resolvePath = path.join(packagePath, './index.ts')
const IGNORE_DIR = ['utils', 'index.ts']

const importTemp = `
  import {App} from 'vue';\n
  import \'./utils/styles/index.css\';\n`

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

const shouldCollect = (d) => !IGNORE_DIR.includes(d)

const composeTemp = (d) => {
  const filePath = `./${d}`
  const temp = `import ${d} from "${filePath}";\n`
  return temp
}

const collectOut = (d) => {
  const r = d.filter((r) => shouldCollect(r))
  const out = `export {${r}};\n`
  return out
}

const Reducer = compose(filter(shouldCollect), map(composeTemp))

const resolveImport = (dir) =>
  importTemp + dir.reduce(Reducer(concat), []).join(' ')

;(async () => {
  const files = await fs.readdir(packagePath)
  const r = await resolveImport(files)
  const out = await collectOut(files)
  const arr = `const components = [${files.filter((v) => shouldCollect(v))}];\n`
  const v = r + arr + installTemp + out
  fs.writeFile(resolvePath, v)
})()
