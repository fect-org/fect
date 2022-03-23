import type { PropType } from 'vue'
import type { NormalSizes } from '../utils'

export const props = {
  modelValue: {
    type: [String, Number],
    default: ''
  },
  autocomplete: String,
  placeholder: String,
  readonly: Boolean,
  disabled: Boolean,
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit'>,
    default: 'none'
  },
  autoHeight: Boolean
}
