const { join } = require('path')
const { lstatSync } = require('fs-extra')

const CJS_PATH = join(__dirname, '..', 'lib')

const ESM_PATH = join(__dirname, '..', 'es')

const DTS_PATH = join(__dirname,'..','types')

const PACKAGE_PATH = join(__dirname, '..', 'packages')

const TMP_PATH = join(__dirname, '..','tmp')

const normalizePath = (path) => path.replace(/\\/g, '/')

const setBabelEnv = (env) => (process.env.BABEL_ENV = env)

const setNodeEnv = (env) => (process.env.NODE_ENV = env)

const isDir = (path) => lstatSync(path).isDirectory()

const isTestDir = (path) => path.endsWith('tests__')

const replaceExt = (path, ext) => path.replace(/\.\w+$/, ext)

const replaceStyleInJs = (code,ext = '')=>  code.replace(/import.+\.(css|less)'/g, ext)

const isScript = (suffix)=>/\.(js|jsx|ts|tsx)/g.test(suffix)

const isStyle = (file) => /\.(css|less)$/.test(file)

module.exports = {
  CJS_PATH,
  ESM_PATH,
  PACKAGE_PATH,
  TMP_PATH,
  DTS_PATH,
  normalizePath,
  setBabelEnv,
  setNodeEnv,
  isDir,
  isTestDir,
  replaceExt,
  replaceStyleInJs,
  isScript,
  isStyle,
}
