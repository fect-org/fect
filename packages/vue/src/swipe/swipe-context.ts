import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { SwipePropInstance, SwipeContext } from './interface'

const READONLY_SWIPE_KEY = Symbol('swipeKey')

export const createSwipeContext = () => createProvider<SwipePropInstance>(READONLY_SWIPE_KEY)

export const useSwipeContext = () => useProvider<SwipeContext>(READONLY_SWIPE_KEY)
