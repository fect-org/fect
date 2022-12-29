import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { BadgeAnchorContext } from './interface'

const READONLY_BADGE_ANCHOR_KEY: InjectionKey<BadgeAnchorContext> = Symbol('badgeAnchorKey')

export const createBadgeContext = () => createProvider(READONLY_BADGE_ANCHOR_KEY)

export const useBadgeContext = () => useProvider(READONLY_BADGE_ANCHOR_KEY)
