const { resolve } = require('path')
const { copy } = require('fs-extra')
const { setBabelEnv, setNodeEnv } = require('./environment')
const { compileJs } = require('./compiler-js')
const PACKAGE_INDEX_PATH = resolve(__dirname, '.././packages/index.ts')
const esPath = resolve(__dirname, '.././es/index.ts') // es
const libPath = resolve(__dirname, '.././lib/index.ts') // cjs

const buildEsEntry = async () => {
  setBabelEnv('esmodule')
  await copy(PACKAGE_INDEX_PATH, esPath)
  await compileJs(esPath)
}

const buildCjsEntry = async () => {
  setBabelEnv('commonjs')
  await copy(PACKAGE_INDEX_PATH, libPath)
  await compileJs(libPath)
}

;(async () => {
  setNodeEnv('production')
  await buildEsEntry()
  await buildCjsEntry()
})()
