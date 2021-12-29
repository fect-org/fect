import type { NormalSizes } from '../utils'

export interface AvatarContext {
  props: {
    stacked: boolean
    isSquare: boolean
    size: NormalSizes
  }
}

export type PropFnArg = 'stacked' | 'isSquare'
export interface PropFn {
  (args: PropFnArg): boolean
}
