import type { BabelEnv } from './constant.d'

export type BundlerTypes = {
  entry:string
  mode:BabelEnv
}

export declare class Bundler {
  entry: string
  mode: BabelEnv
  constructor({ entry,mode }:BundlerTypes)
  compilerComponent(entryPath: string): Promise<void>
  run():Promise<void>
}
