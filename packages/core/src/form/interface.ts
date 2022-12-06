import { ComponentInstance } from '../utils'
import { props } from './props'
import type { RuleItem, CallbackErrors } from 'proy'
import type { FormItemProps } from '../form-item/props'
import type { ComputedRef, ExtractDefaultPropTypes } from 'vue'
import { Apollo } from './apollo'

export type LabelPosition = 'left' | 'right' | 'top'

export type Trigger = 'change' | 'blur' | ''

export type FormProps = ExtractDefaultPropTypes<typeof props>

export interface FormContext {
  apollo: Apollo
  props: FormProps
}

export type FormItemInstance = ComponentInstance<
  Omit<FormItemCotnext, 'behavior'> &
    FormItemProps & {
      updateShowLogState: (state: boolean) => void
      clearValidate: () => void
    }
>

export interface ValidateResult {
  state: boolean
  errs: ValidateErrorParams
}

export interface FormItemCotnext {
  behavior: ComputedRef<Pick<FormProps, 'disabled' | 'size'>>
  validate: (trigger: Trigger, callback?: ValidateCallback) => ValidateResult | void
}

export type FormInstance = ComponentInstance<{
  validate: (callback?: ValidateCallback) => void | Promise<PromisfyValidate>
  validateField: (fields: string | string[], callback?: ValidateCallback) => void
  clearValidate: (fields: string[]) => void
}>

export interface FormRule extends RuleItem {
  trigger?: Trigger
}

export type FormRules = Record<string, FormRule | FormRule[]>

export type ValidateErrorParams = Record<string, CallbackErrors[]>

export type PromisfyValidate = boolean | ValidateErrorParams

export type ValidateCallback = (state: boolean, err: ValidateErrorParams) => void
