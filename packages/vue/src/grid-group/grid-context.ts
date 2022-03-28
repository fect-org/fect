import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { GridGroupContext } from './interface'

const READONLY_GRID_KEY = Symbol('grdiKey')

export const createGridContext = () => createProvider(READONLY_GRID_KEY)

export const useGridContext = () => useProvider<GridGroupContext>(READONLY_GRID_KEY)
