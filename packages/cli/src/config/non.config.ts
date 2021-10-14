/**
 * nonrc as config
 */
import { join } from 'path'
import { CWD } from '../shared/constant'

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
  /**
   * 热启动
   */
  hot?: boolean
}

const config: NonConfig = {
  name: 'Fect',
  entry: join(CWD, 'src', 'main.js'),
  port: 8080,
  hot: false,
}

export default config
