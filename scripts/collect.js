/**
 * author :XeryYue
 * collect all component and create at packages/index.js
 */

const fs = require('fs-extra')
const path = require('path')
const { compose, concat, filter, map } = require('./reducer')
const packagePath = path.join(__dirname, '../_packages')
const resolvePath = path.join(packagePath, './index.ts')
const IGNORE_DIR = ['utils', 'index.ts']

const styleTemp = 'import \'./utils/styles/index.css\''

const shouldCollect = (d) => !IGNORE_DIR.includes(d)

const composeTemp = (d) => {
  const filePath = `./${d}`
  const temp = `export {default as ${d}} from "${filePath}";\n`
  return temp
}

const Reducer = compose(filter(shouldCollect), map(composeTemp))

const resolveImport = (dir) =>
  dir.reduce(Reducer(concat), []).join(' ') + styleTemp

;(async () => {
  const files = await fs.readdir(packagePath)
  const r = await resolveImport(files)
  fs.writeFile(resolvePath, r)
})()
