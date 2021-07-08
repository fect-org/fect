const { lstatSync } = require('fs-extra')

const normalizePath = (path) => path.replace(/\\/g, '/')

const isTestDir = (path) => path.endsWith('tests__')

const isDir = (path) => lstatSync(path).isDirectory()

const isStyle = (file) => /\.(css|less)$/.test(file)

const replaceExt = (path, ext) => path.replace(/\.\w+$/, ext)

const replaceStyleInJs = (code, ext) =>
  code.replace(/import.+\.(css|less)'/g, ext)

module.exports = {
  normalizePath,
  isTestDir,
  isDir,
  isStyle,
  replaceStyleInJs,
  replaceExt,
}
