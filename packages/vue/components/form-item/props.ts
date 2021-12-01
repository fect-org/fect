import { PropType, ExtractDefaultPropTypes } from 'vue'
import type { LabelPosition } from '../form/type'

export const props = {
  prop: String,
  for: String,
  label: String,
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: '',
  },
  required: Boolean,
  showMessage: Boolean,
}

export type FormItemProps = ExtractDefaultPropTypes<typeof props>
