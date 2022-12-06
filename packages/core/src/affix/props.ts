import type { PropType } from 'vue'
import type { AffixPosition } from './interface'

export const props = {
  offset: {
    type: [Number, String],
    default: 0
  },
  position: {
    type: String as PropType<AffixPosition>,
    default: 'top'
  },
  zIndex: Number
}
