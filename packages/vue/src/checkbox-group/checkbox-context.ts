import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { CheckboxContext } from './interface'

export const READONLY_CHECKBOX_KEY = Symbol('checkboxKey')

export const createCheckboxContext = () => createProvider(READONLY_CHECKBOX_KEY)

export const useCheckboxContext = () => useProvider<CheckboxContext>(READONLY_CHECKBOX_KEY)
