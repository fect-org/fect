import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import { InjectionKey } from 'vue'
import type { GridGroupContext } from './interface'

const READONLY_GRID_KEY: InjectionKey<GridGroupContext> = Symbol('grdiKey')

export const createGridContext = () => createProvider(READONLY_GRID_KEY)

export const useGridContext = () => useProvider(READONLY_GRID_KEY)
