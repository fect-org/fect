import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { CollapseContext } from './interface'

export const READONLY_COLLAPSE_KEY: InjectionKey<CollapseContext> = Symbol('collapseKey')

export const createCollapseContext = () => createProvider(READONLY_COLLAPSE_KEY)

export const useCollapseContext = () => useProvider(READONLY_COLLAPSE_KEY)
