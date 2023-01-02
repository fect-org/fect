/**
 * https://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html#attr-button-type
 */

import { PropType } from 'vue'
import type { ButtonHTMLAttributes } from 'vue'
import type { ButtonTypes, LoadingTypes } from '../utils'

export const props = {
  type: {
    type: String as PropType<ButtonTypes>,
    default: 'default'
  },
  ghost: Boolean,
  loading: Boolean,
  shadow: Boolean,
  auto: Boolean,
  disabled: Boolean,
  loadType: {
    type: String as PropType<LoadingTypes>,
    default: 'default'
  },
  effect: {
    type: Boolean,
    default: true
  },
  htmlType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button'
  }
}
