import { cwd } from 'process'
import { join } from 'path'
import { lstatSync } from 'fs-extra'

// env function

export const setNodeENV = (env: 'production' | 'development' | 'test') => (process.env.NODE_ENV = env)

export const setBabelEnv = (env: 'commonjs' | 'esmodule') => (process.env.BABEL_ENV = env)

export const CWD = cwd()

export const ESM_PATH = join(CWD, 'es')

export const CJS_PATH = join(CWD, 'lib')

export const DTS_PATH = join(CWD, 'types')

export const UMD_PATH = CJS_PATH

export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

export const VITE_RESOLVE_EXTENSIONS = [...SCRIPTS_EXTENSIONS, '.json', '.less', '.vue', '.css']

export const NONRC_REG = /(.?)(non).+\.(js|ts)/g

export const NON_DEFAULT_PATH = join(__dirname, '..', 'config', 'non.config.js')

export const DECLARATION_PATH = join(__dirname, '..', '..', 'declaration.json')

export const TMP_PATH = join(CWD, 'tmp')

export const TSCONFIG_PATH = join(TMP_PATH, 'tsconfig.json')

export const USER_PACKAGES_JSON_PATH = join(CWD, 'package.json')

export const IGNORE_DIR = ['utils', 'index.ts']

export const IMPORT_REG = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

export const normalizePath = (path) => path.replace(/\\/g, '/')

export const isDir = (path) => lstatSync(path).isDirectory()

export const isTestDir = (path) => path.endsWith('__tests__')

export const replaceStyleInJs = (code, ext = '') => code.replace(/import.+\.(css|less)'/g, ext)

export const isScript = (suffix) => /\.(js|jsx|ts|tsx)/g.test(suffix)

export const isStyle = (file) => /\.(css|less)$/.test(file)

export const replaceExt = (path, ext) => path.replace(/\.\w+$/, ext)
