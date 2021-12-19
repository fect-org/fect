import type { PropType } from 'vue'
import type { NormalTypes } from '../utils'

export const props = {
  text: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String as PropType<NormalTypes>,
    default: 'default'
  },
  total: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
    default: 0
  },
  hover: Boolean,
  willBeDestroy: Boolean
}
