import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import { InjectionKey } from 'vue'
import type { SwipePropInstance, SwipeContext } from './interface'

const READONLY_SWIPE_KEY: InjectionKey<SwipeContext> = Symbol('swipeKey')

export const createSwipeContext = () => createProvider<SwipePropInstance>(READONLY_SWIPE_KEY)

export const useSwipeContext = () => useProvider(READONLY_SWIPE_KEY)
