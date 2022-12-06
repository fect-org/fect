import type { PropType } from 'vue'
import { NormalSizes } from '../utils'

export const buttonGroupProps = {
  auto: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<NormalSizes>,
    default: 'small'
  },
  vertical: Boolean
}
