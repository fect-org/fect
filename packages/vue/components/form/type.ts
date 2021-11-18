import { ComputedRef } from 'vue'
import { tuple, NormalSizes } from '../utils'

const labelPosition = tuple('left', 'right', 'top')

export type LabelPosition = typeof labelPosition[number]

export type LabelState = {
  size: NormalSizes
  disabled: boolean
}

export type Pattern = {
  inline: boolean
  showMessage: boolean
  labelPosition: LabelPosition
  labelWidth: string | number
}

export const READONLY_FORM_KEY = Symbol('formKey')

export type FormProvide = {
  labelState: ComputedRef<LabelState>
  pattern: ComputedRef<Pattern>
}
