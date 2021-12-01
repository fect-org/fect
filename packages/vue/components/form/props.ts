import { PropType, ExtractDefaultPropTypes } from 'vue'
import { LabelPosition } from './type'

export const props = {
  model: {
    type: Object,
    default: () => {},
  },
  rules: {
    type: Object,
    default: () => {},
  },
  inline: Boolean,
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: 'right',
  },
  labelWidth: {
    type: [String, Number],
    default: 'auto',
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
}

export type FormProps = ExtractDefaultPropTypes<typeof props>
