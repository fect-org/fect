import type { PropType } from 'vue'
import type { NormalSizes } from '../utils'

export const props = {
  modelValue: {
    type: Number,
    default: 1
  },
  count: {
    type: Number,
    default: 1
  },
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  prevText: { type: String, default: 'Prev' },
  nextText: { type: String, default: 'Next' },
  simple: Boolean,
  limit: { type: Number, default: 7 }
}
