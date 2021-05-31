/**
 * author :XeryYue
 * collect all component and create at packages/index.js
 */

const fs = require('fs-extra')
const path = require('path')
const packagePath = path.join(__dirname, '../packages')
const resolvePath = path.join(packagePath, './index.js')
const IGNORE_DIR = ['utils']

const styleTemp = 'import \'./utils/styles/index.css\''

const resolveImport = (dir) => {
  dir
    = dir
      .filter((d) => !IGNORE_DIR.includes(d))
      .filter((r) => !r.endsWith('.js'))
      .map((d) => {
        const filePath = `./${d}`
        const temp = `export {default as ${d}} from "${filePath}";\n`
        return temp
      })
      .join(' ') + styleTemp
  return dir
}

;(async () => {
  const files = await fs.readdir(packagePath)
  const r = await resolveImport(files)
  fs.writeFile(resolvePath, r)
})()
