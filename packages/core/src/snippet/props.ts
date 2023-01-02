import type { PropType } from 'vue'
import type { SnippetStyleTypes, SnippetCopyTypes, NormalTypes } from '../utils'

export const props = {
  text: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
    required: true
  },
  fill: Boolean,
  type: {
    type: String as PropType<SnippetStyleTypes>,
    default: 'default'
  },
  copy: {
    type: String as PropType<SnippetCopyTypes>,
    default: 'default'
  },
  symbol: {
    type: String,
    default: '$'
  },
  toastText: {
    type: String,
    default: 'Copied to clipboard!'
  },
  toastType: {
    type: String as PropType<NormalTypes>,
    default: 'success'
  }
}
