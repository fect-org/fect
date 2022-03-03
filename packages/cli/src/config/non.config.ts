/**
 * nonrc as config
 */
import type { Plugin, UserConfig } from 'vite'

export type Formats = 'es' | 'cjs' | 'umd'

export interface Lib {
  input: string
  name?: string
  format?: Formats | Formats[]
}

export interface NonConfig {
  port?: number
  plugins?: Plugin[]
  lib?: Lib
  viteConfigure?: UserConfig
}

const config: NonConfig = {
  port: 8080
}

export default config
