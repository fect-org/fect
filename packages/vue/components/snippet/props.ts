import { PropType } from 'vue'
import { NormalTypes, SnippetCopyTypes } from '../utils'

export const props = {
  text: {
    type: String,
    default: '',
    required: true,
  },
  width: {
    type: [String, Number],
    default: 'initial',
  },
  fill: Boolean,
  type: {
    type: String as PropType<NormalTypes>,
    default: 'default',
  },
  copy: {
    type: String as PropType<SnippetCopyTypes>,
    default: 'default',
  },
  symbol: {
    type: String,
    default: '$',
  },
  toastText: {
    type: String,
    default: 'Copied to clipboard!',
  },
  toastType: {
    type: String as PropType<NormalTypes>,
    default: 'success',
  },
}
