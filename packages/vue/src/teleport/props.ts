import { PropType, TeleportProps } from 'vue'

export const props = {
  teleport: String as PropType<TeleportProps['to']>,
  show: Boolean,
  transition: String,
  overlay: Boolean,
  scroll: {
    type: Boolean,
    default: true
  },
  popupClass: {
    type: String,
    default: ''
  }
}
