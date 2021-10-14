import { cwd } from 'process'
import { join } from 'path'

export const CWD = cwd()

export const ESM_PATH = join(CWD, 'es')

export const CJS_PATH = join(CWD, 'lib')

export const DTS_PATH = join(CWD, 'types')

export const UMD_PATH = CJS_PATH

export const TSCONFIG_PATH = join(__dirname, '..', 'config')

export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

export const VITE_RESOLVE_EXTENSIONS = [...SCRIPTS_EXTENSIONS, '.json', '.less', '.vue', '.css']

export const NONRC_REG = /(.?)(non).+\.(js|ts)/g

export const NON_DEFAULT_PATH = join(__dirname, '..', 'config', 'non.config.js')

export const DECLARATION_PATH = join(__dirname, '..', 'config', 'declaration.json')

