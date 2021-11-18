import { PropType } from 'vue'
import { LabelPosition } from './type'
import { NormalSizes } from '../utils'
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
  inlineMessage: Boolean,
  // required: {},
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium',
  },
  disabledAll: Boolean,
}
