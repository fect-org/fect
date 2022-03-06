import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { TransformStyles } from './interface'

const READONLY_BADGE_ANCHOR_KEY = Symbol('badgeAnchorKey')

export const createBadgeContext = () => createProvider(READONLY_BADGE_ANCHOR_KEY)

export const useBadgeContext = () => useProvider<TransformStyles>(READONLY_BADGE_ANCHOR_KEY)
