import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { LayoutContext } from './interface'

const READONLY_LAYOUT_KEY: InjectionKey<LayoutContext> = Symbol('layoutkey')

export const createLayoutContext = () => createProvider(READONLY_LAYOUT_KEY)

export const useLayoutContext = () => useProvider(READONLY_LAYOUT_KEY)
