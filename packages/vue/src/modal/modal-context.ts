import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { ModalContext } from './interface'

export const READONLY_MODAL_KEY = Symbol('modalKey')

export const createModalContext = () => createProvider(READONLY_MODAL_KEY)

export const useModalContext = () => useProvider<ModalContext>(READONLY_MODAL_KEY)
