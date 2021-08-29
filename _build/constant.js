const { join } = require('path')
const { tmpdir } = require('os')
const { lstatSync } = require('fs-extra')

const CJS_PATH = join(__dirname, '..', 'lib')

const ESM_PATH = join(__dirname, '..', 'es')

const PACKAGE_PATH = join(__dirname, '..', 'packages')

const TMP_PATH = join(tmpdir(), 'fect')

const normalizePath = (path) => path.replace(/\\/g, '/')

const setBabelEnv = (env) => (process.env.BABEL_ENV = env)

const setNodeEnv = (env) => (process.env.NODE_ENV = env)

const isDir = (path) => lstatSync(path).isDirectory()

const isTestDir = (path) => path.endsWith('tests__')

const replaceExt = (path, ext) => path.replace(/\.\w+$/, ext)

module.exports = {
  CJS_PATH,
  ESM_PATH,
  PACKAGE_PATH,
  TMP_PATH,
  normalizePath,
  setBabelEnv,
  setNodeEnv,
  isDir,
  isTestDir,
  replaceExt,
}
