const { join } = require('path')
const { lstatSync, existsSync } = require('fs-extra')

const CJS_PATH = join(__dirname, '..', 'lib')

const ESM_PATH = join(__dirname, '..', 'es')

const DTS_PATH = join(__dirname, '..', 'types')

const PACKAGE_PATH = join(__dirname, '..', 'packages', 'vue', 'components')

const TMP_PATH = join(__dirname, '..', 'tmp')

const DECLARATION_PATH = join(__dirname, 'declaration.json')

const SCRIPT_PATH = join(__dirname, '..', 'scripts')

const TSCONFIG_PATH = join(TMP_PATH, 'tsconfig.json')

const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

const normalizePath = (path) => path.replace(/\\/g, '/')

const setBabelEnv = (env) => (process.env.BABEL_ENV = env)

const setNodeEnv = (env) => (process.env.NODE_ENV = env)

const isDir = (path) => lstatSync(path).isDirectory()

const isTestDir = (path) => path.endsWith('tests__')

const replaceExt = (path, ext) => path.replace(/\.\w+$/, ext)

const replaceStyleInJs = (code, ext = '') =>
  code.replace(/import.+\.(css|less)'/g, ext)

const isScript = (suffix) => /\.(js|jsx|ts|tsx)/g.test(suffix)

const isStyle = (file) => /\.(css|less)$/.test(file)

const STYLE_EXIT = [
  'index.vue',
  'index.js',
  'index.jsx',
  'index.ts',
  'index.tsx',
]

const fillExt = (entry) => {
  for (const key of STYLE_EXIT) {
    const path = `${entry}/${key}`
    if (existsSync(path)) return path
  }
  return ''
}

module.exports = {
  CJS_PATH,
  ESM_PATH,
  PACKAGE_PATH,
  TMP_PATH,
  DTS_PATH,
  DECLARATION_PATH,
  TSCONFIG_PATH,
  SCRIPT_PATH,
  IMPORT_REG,
  normalizePath,
  setBabelEnv,
  setNodeEnv,
  isDir,
  isTestDir,
  replaceExt,
  replaceStyleInJs,
  isScript,
  isStyle,
  fillExt,
}
