import { Ref, ExtractPropTypes } from 'vue'
import { props, staticModalProps } from './props'

export type ModalProvide = {
  props: ExtractPropTypes<typeof props>
  selfVisible: Ref<boolean>
  setSelfVisible: (val: boolean) => void
}

export const READONLY_MODAL_KEY = 'modalKey'

export type StaticModalOptions = ExtractPropTypes<typeof staticModalProps> & {
  confirm: () => void
  close: () => void
}
