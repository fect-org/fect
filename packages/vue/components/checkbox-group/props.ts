import type { PropType } from 'vue'
import type { NormalSizes } from '../utils'

export const basicProps = {
  disabled: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  }
}

export const checkboxProps = {
  ...basicProps,
  modelValue: Boolean,
  label: {
    type: String,
    default: ''
  }
}

export const checkboxGroupProps = {
  ...basicProps,
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  useRow: Boolean
}
