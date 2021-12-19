import { createProvider, useProvider } from '@fect-ui/vue-hooks'

import type { ToastCotnext } from './interface'

export const READONLY_TOAST_KEY = Symbol('toast')

export const createToastContext = () => createProvider(READONLY_TOAST_KEY)

export const useToastContext = () => useProvider<ToastCotnext>(READONLY_TOAST_KEY)

