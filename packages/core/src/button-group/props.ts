import { PropType } from 'vue'
import type { ButtonTypes } from '../utils'

export const buttonGroupProps = {
  vertical: Boolean,
  type: {
    type: String as PropType<ButtonTypes>,
    default: 'default'
  },
  ghost: Boolean,
  disabled: Boolean
}
