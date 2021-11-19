import { ComputedRef } from 'vue'
import { tuple, NormalSizes } from '../utils'
import type { FormProps } from './props'

export const labelPosition = tuple('left', 'right', 'top')

export type LabelPosition = typeof labelPosition[number]

export const READONLY_FORM_KEY = Symbol('formKey')

export type FormProvide = {
  formProps: FormProps
  getLabelPostion: (postion: LabelPosition | '') => Exclude<LabelPosition, 'top'> | null
}
