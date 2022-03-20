import { tuple } from '../utils'
import { props } from './props'
import type { RuleItem, CallbackErrors } from 'proy'
import type { ComputedRef, ExtractDefaultPropTypes } from 'vue'
import { Apollo } from './apollo'
import type { FormItemProps } from '../form-item/props'

export const labelPosition = tuple('left', 'right', 'top')

export type LabelPosition = typeof labelPosition[number]

export type Trigger = 'change' | 'blur'

export type FormProps = ExtractDefaultPropTypes<typeof props>

export interface FormContext {
  apollo: Apollo
  props: FormProps
  // validate: (trigger: Trigger) => void
}

export interface FormItemCotnext {
  behavior: ComputedRef<Pick<FormProps, 'disabled' | 'size'>>
  validate: (trigger: Trigger, callback?: ValidateCallback) => void
  resetField: () => void
  clearValidate: () => void
}

export interface FormRule extends RuleItem {
  trigger?: Trigger
}

export type FormRules = Record<string, FormRule | FormRule[]>

export type ValidateErrorParams = Record<string, CallbackErrors[]>

export type PromisfyValidate = boolean | ValidateErrorParams

export type ValidateCallback = (state: boolean, err: ValidateErrorParams) => void
