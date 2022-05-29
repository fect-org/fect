import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import { InjectionKey } from 'vue'
import type { SelectContext, SelectPropInstance } from './interface'

export const READONLY_SELECT_KEY: InjectionKey<SelectContext> = Symbol('selectKey')

export const createSelectContext = () => createProvider<SelectPropInstance, SelectContext>(READONLY_SELECT_KEY)

export const useSelectContext = () => useProvider(READONLY_SELECT_KEY)
