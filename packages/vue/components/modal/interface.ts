import { Ref, ExtractPropTypes } from 'vue'
import { props, staticModalProps } from './props'

export type Action = 'confirm' | 'cancel' | ''

export type ModalContext = ExtractPropTypes<typeof props> & {
  selfVisible: Ref<boolean>
  setSelfVisible: (val: boolean) => void
  setAction: (val: Action) => void
}

export type StaticModalOptions = ExtractPropTypes<typeof staticModalProps> & {
  content?: string
  confirm?: () => void
  close?: () => void
}
