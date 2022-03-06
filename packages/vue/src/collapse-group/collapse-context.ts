import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { CollapseContext } from './interface'

export const READONLY_COLLAPSE_KEY = Symbol('collapseKey')

export const createCollapseContext = () => createProvider(READONLY_COLLAPSE_KEY)

export const useCollapseContext = () => useProvider<CollapseContext>(READONLY_COLLAPSE_KEY)
