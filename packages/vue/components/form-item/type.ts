import type { FormItemProps } from './props'

export const READONLY_FORM_ITEM_KEY = Symbol('FormItemKey')

export interface FormItemProvide {
  formItemProps: FormItemProps
  resetField: () => void
  clearValidate: () => void
}
