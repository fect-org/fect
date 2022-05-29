import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { AvatarContext } from './interface'

export const READONLY_AVATAR_KEY: InjectionKey<AvatarContext> = Symbol('avatarKey')

export const createAvatarContext = () => createProvider(READONLY_AVATAR_KEY)

export const useAvatarContext = () => useProvider(READONLY_AVATAR_KEY)
