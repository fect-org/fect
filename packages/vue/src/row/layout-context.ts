import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { LayoutContext } from './interface'

const READONLY_LAYOUT_KEY = Symbol('layoutkey')

export const createLayoutContext = () => createProvider(READONLY_LAYOUT_KEY)

export const useLayoutContext = () => useProvider<LayoutContext>(READONLY_LAYOUT_KEY)
