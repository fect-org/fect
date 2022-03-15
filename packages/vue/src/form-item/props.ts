import { PropType, ExtractDefaultPropTypes } from 'vue'
import type { LabelPosition } from '../form/interface'
import { NormalSizes } from '../utils'

export const props = {
  prop: String,
  for: {
    type: String,
    default: ''
  },
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: ''
  },
  required: Boolean,
  showMessage: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  disabled: Boolean
}

export type FormItemProps = ExtractDefaultPropTypes<typeof props>
