export type BabelEnv = 'esmodule' | 'commonjs'

export type NodeEnv = 'production' | 'development' | 'test'

export const CJS_PATH: string

export const ESM_PATH: string

export const PACKAGE_PATH: string

export const TMP_PATH: string

export const DTS_PATH:string

export declare const normalizePath: (path: string) => string

export declare const setBabelEnv: (env: BabelEnv) => void

export declare const setNodeEnv: (env: NodeEnv) => void

export declare const isTestDir: (path: string) => boolean

export declare const isDir: (path: string) => boolean

export declare const replaceExt: (path: string, ext: string) => string

export declare const replaceStyleInJs:(code:string,ext?:string)=>string

export declare const isScript:(suffix:string)=>boolean

export declare const isStyle:(suffix:string)=>void
