interface Props {
  visible: boolean
  title: string
  width: string
  cancel: string
  done: string
}

export type ModalProvide = {
  updateVisibleValue: (val: boolean) => void
  props: Props
}

export const READONLY_MODAL_KEY = 'modalKey'
