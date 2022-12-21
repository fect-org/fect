import { noop } from '@fect-ui/shared'
import type { PropType, ExtractDefaultPropTypes } from 'vue'
import type { NormalSizes } from '../utils'
import type { LabelPosition } from '../form/interface'

export const props = {
  prop: String,
  for: {
    type: String,
    default: ''
  },
  rules: {
    type: Object,
    default: noop
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
    default: ''
  },
  disabled: Boolean
}

export type FormItemProps = ExtractDefaultPropTypes<typeof props>
