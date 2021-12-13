/**
 * nonrc as config
 */
import { join } from 'path'
import { CWD } from '../shared/constant'
import { Plugin } from 'vite'

export type Formats = 'es' | 'cjs' | 'umd' | 'default' | 'noumd'

export interface Lib {
  input: string
  name?: string
  format?: Formats
}

export interface NonConfig {
  /**
   * 提供UMD的包名
   */
  name?: string
  /**
   * 提供项目入口
   */
  entry: string
  /**
   * 启动端口
   */
  port?: number

  library?: boolean
  formats?: Formats
  plugins?: Plugin[]
  /**
   * library mode . we only do transform . not do build .
   */
  lib?: Lib
}

const config: NonConfig = {
  name: 'fect',
  entry: join(CWD, 'src', 'main.js'),
  port: 8080,
  library: true,
  formats: 'default'
}

export default config
