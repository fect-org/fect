const { readdirSync, copy, removeSync } = require('fs-extra')
const { resolve } = require('path')
const { normalizePath } = require('./utils')

const ClibuildPath = resolve(__dirname, '.././tempo')
const libPath = resolve(__dirname, '.././lib')

const compilerUmd = async () => {
  readdirSync(ClibuildPath).map(async (file) => {
    const fullPath = normalizePath(resolve(ClibuildPath, file))
    if (file.endsWith('.css')) {
      copy(fullPath, resolve(libPath, './main.css'))
    }
    if (file.endsWith('.min.js')) {
      copy(fullPath, resolve(libPath, './fect.min.js'))
    }
    if (file.endsWith('.umd.js')) {
      copy(fullPath, resolve(libPath, './fect.js'))
    }
  })
}

;(async () => {
  await compilerUmd()
})()
