import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'

import type { ToastCotnext, TostInstance } from './interface'

export const READONLY_TOAST_KEY: InjectionKey<ToastCotnext> = Symbol('toast')

export const createToastContext = () => createProvider<TostInstance, ToastCotnext>(READONLY_TOAST_KEY)

export const useToastContext = () => useProvider<ToastCotnext>(READONLY_TOAST_KEY)
