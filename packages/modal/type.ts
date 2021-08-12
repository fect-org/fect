import { Ref } from 'vue'

interface Props {
  visible: boolean
  title: string
  width: string
  cancel: string
  done: string
  teleport: keyof HTMLElementTagNameMap
}

export type ModalProvide = {
  props: Props
  selfVisible: Ref<boolean>
  setSelfVisible: (val: boolean) => void
}

export const READONLY_MODAL_KEY = 'modalKey'
