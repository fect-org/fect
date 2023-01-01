import type { PropType } from 'vue'
import type { NormalTypes, LoadingTypes } from '../utils'

export const props = {
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
