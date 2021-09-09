import { PropType } from 'vue'
import { NormalSizes } from '../utils/theme/propTypes'

export const props = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  multiple: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
}
