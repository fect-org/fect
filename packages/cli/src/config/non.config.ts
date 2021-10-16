/**
 * nonrc as config
 */
import { join } from 'path'
import { CWD } from '../shared/constant'
import { Plugin } from 'vite'

export type NonConfig = {
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

  plugins?: Plugin[]
}

const config: NonConfig = {
  name: 'fect',
  entry: join(CWD, 'src', 'main.js'),
  port: 8080,
}

export default config
