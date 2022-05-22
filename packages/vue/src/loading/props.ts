import type { PropType } from 'vue'
import type { NormalSizes, NormalTypes, LoadingTypes } from '../utils'

export const props = {
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  type: {
    type: String as PropType<NormalTypes>,
    default: 'default'
  },
  loadType: {
    type: String as PropType<LoadingTypes>,
    default: 'default'
  },
  color: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: ''
  }
}
