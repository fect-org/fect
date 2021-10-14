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
  /**
   * 库打包模式
   */
  // library?: boolean
  // /**
  //  * 生成库的格式 'umd'|'esmodule'|'commonjs'|'default'
  //  */
  // mode?: 'umd' | 'esmodule' | 'commonjs' | 'default'
}

const config: NonConfig = {
  name: 'fect',
  entry: join(CWD, 'src', 'main.js'),
  port: 8080,
  hot: false,
  // library: false,
}

export default config
