import { PropType } from 'vue'

export type Placement = 'top' | 'right' | 'left' | 'bottom'

export const props = {
  modelValue: Boolean,
  overlay: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'right'
  },
  round: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'body'
  },
  disableOverlayClick: Boolean
}
