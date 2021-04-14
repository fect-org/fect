/**
 * author :XeryYue
 * collect all component and create at packages/index.js
 *  waste
 */
const fs = require('fs-extra')
const path = require('path')
const packagePath = path.resolve(__dirname, '../packages')
const resolvePath = path.join(packagePath, './index.js')

const IGNORE_DIR = ['utils', 'createContext']

const IGNORE_FILE_REG = /.*?(\.js)$/g

const importTemplate = `;const install = (vue) => {
    if (!install.installed) {
      components.map((component) => {
        component.install(vue)
      })
    }
    return
  };\n export default { install };\n`

const resolveImport = (dir, dirPath) => {
  const importFile = []
  const components = []
  dir = dir
    .filter((d) => !IGNORE_DIR.includes(d))
    .filter((d) => !d.endsWith('.js'))
    .map((d) => {
      const filePath = `./${d}`
      importFile.push(`import ${d} from "${filePath}"`)
      components.push(`${d}`)
    })
  importFile.push(`
  import './utils/styles/index.css'`)
  return [importFile.join(';\n'), components]
}

;(async () => {
  const files = await fs.readdir(packagePath)
  const [importFile, components] = await resolveImport(files, packagePath)
  const resolveFile
    = importFile + `;const components =[${components}]` + importTemplate
  await fs.writeFile(resolvePath, resolveFile)
})()
