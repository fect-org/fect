import { cwd } from 'process'
import { join } from 'path'

export const CWD = cwd()

/**
 * build esm cjs packages we set it as default user can't change it
 */

export const ESM_PATH = join(CWD, 'es')

export const CJS_PATH = join(CWD, 'lib')

export const UMD_PATH = CJS_PATH

export const TSCONFIG_PATH = join(__dirname, '..', 'config')

export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

export const VITE_RESOLVE_EXTENSIONS = [...SCRIPTS_EXTENSIONS, '.json', '.less', '.vue', '.css']


