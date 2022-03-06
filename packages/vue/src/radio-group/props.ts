import type { PropType } from 'vue'

import type { NormalSizes } from '../utils'

export const basicProps = {
  disabled: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  }
}

export const radioGroupProps = {
  ...basicProps,
  modelValue: [String, Number],
  useRow: Boolean
}

export const radioProps = {
  ...basicProps,
  checked: Boolean,
  value: [String, Number]
}
