import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { SelectContext, SelectPropInstance } from './interface'

export const READONLY_SELECT_KEY = Symbol('selectKey')

export const createSelectContext = () => createProvider<SelectPropInstance>(READONLY_SELECT_KEY)

export const useSelectContext = () => useProvider<SelectContext>(READONLY_SELECT_KEY)
