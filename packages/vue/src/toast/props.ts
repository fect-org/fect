import type { PropType } from 'vue'
import { noop } from '../utils'
import type { NormalTypes, PlaceTypes } from '../utils'
import type { ToastAction, ToastInternalOptions } from './interface'

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
  willBeDestroy: Boolean,
  placement: {
    type: String as PropType<PlaceTypes>,
    default: 'bottomRight'
  },
  actions: [Array, String] as PropType<Array<ToastAction> | 'cancel'>
}

export const toastProps = {
  actions: [Array, String] as PropType<Array<ToastAction> | 'cancel'>,
  toast: {
    type: Object as PropType<ToastInternalOptions>,
    default: noop
  }
}
