import type { BabelEnv } from './constant'

export type BundlerTypes = {
  entry:string
  mode:BabelEnv
}

export declare class Bundler {
  entry: string
  mode: BabelEnv
  constructor({ entry,mode }:BundlerTypes)
  run():Promise<void>
  static cleanBuild():Promise<void>
}
