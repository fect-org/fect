import { ExtractPropTypes } from 'vue'
import { props, staticModalProps } from './props'

export type Action = 'confirm' | 'cancel'

export interface ModalContext {
  props: ExtractPropTypes<typeof props>
  closeModal: (action: Action) => void
}

export type StaticModalOptions = Partial<ExtractPropTypes<typeof staticModalProps>> & {
  content?: string
  confirm?: () => void
  close?: () => void
}
