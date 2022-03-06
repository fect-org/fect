import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { AvatarContext } from './interface'

export const READONLY_AVATAR_KEY = Symbol('avatarKey')

export const createAvatarContext = () => createProvider(READONLY_AVATAR_KEY)

export const useAvatarContext = () => useProvider<AvatarContext>(READONLY_AVATAR_KEY)
