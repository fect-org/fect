import { noop } from '../utils'
import type { NormalSizes } from '../utils'
import type { PropType } from 'vue'
import type { LabelPosition } from './interface'

export const props = {
  model: {
    type: Object,
    default: noop
  },
  rules: {
    type: Object,
    default: noop
  },
  inline: Boolean,
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: 'right'
  },
  labelWidth: {
    type: [String, Number],
    default: 'auto'
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  disabled: Boolean
}
