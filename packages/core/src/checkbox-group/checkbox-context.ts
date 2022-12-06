import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { CheckboxContext } from './interface'

export const READONLY_CHECKBOX_KEY: InjectionKey<CheckboxContext> = Symbol('checkboxKey')

export const createCheckboxContext = () => createProvider(READONLY_CHECKBOX_KEY)

export const useCheckboxContext = () => useProvider(READONLY_CHECKBOX_KEY)
