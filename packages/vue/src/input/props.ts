import type { PropType } from 'vue'
import type { NormalSizes } from '../utils'

export const props = {
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: { type: String, default: 'text' },
  placeholder: String,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  autocomplete: String,
  readonly: Boolean,
  disabled: Boolean,
  clearable: Boolean,
  prefix: [String, Number],
  suffix: [String, Number]
}
