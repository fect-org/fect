import type { NormalSizes } from '../utils'

export const READONLY_AVATAR_KEY = Symbol('avatarKey')

export interface AvatarGroupProvide {
  props: {
    stacked: boolean
    isSquare: boolean
    size: NormalSizes
  }
}
