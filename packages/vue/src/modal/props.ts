import { PropType } from 'vue'
import { omit } from '../utils'

export const props = {
  visible: Boolean,
  title: {
    tupe: String,
    default: ''
  },
  width: {
    type: String,
    default: '400px'
  },
  cancel: {
    type: String,
    default: 'cancel'
  },
  done: {
    type: String,
    default: 'done'
  },
  teleport: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'body'
  },
  overlay: {
    type: Boolean,
    default: true
  },
  disableOverlayClick: Boolean,
  keyboard: {
    type: Boolean,
    default: true
  }
}

export const staticModalProps = omit(props, ['teleport', 'overlay', 'visible'])
