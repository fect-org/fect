import { createProvider, useProvider } from '@fect-ui/vue-hooks'

import type { FormContext, FormItemCotnext } from './interface'

const READONLY_FORM_KEY = Symbol('formKey')

const READONLY_FORM_ITEM_KEY = Symbol('formItemKey')

export const createFormContext = () => createProvider(READONLY_FORM_KEY)

export const useFormContext = () => useProvider<FormContext>(READONLY_FORM_KEY)

export const createFormItemContext = () => createProvider(READONLY_FORM_ITEM_KEY)

export const useFormItemCotnext = () => useProvider<FormItemCotnext>(READONLY_FORM_ITEM_KEY)
