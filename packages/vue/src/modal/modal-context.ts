import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { ModalContext } from './interface'

export const READONLY_MODAL_KEY: InjectionKey<ModalContext> = Symbol('modalKey')

export const createModalContext = () => createProvider(READONLY_MODAL_KEY)

export const useModalContext = () => useProvider(READONLY_MODAL_KEY)
