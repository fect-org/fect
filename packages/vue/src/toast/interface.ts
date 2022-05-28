import { props } from './props'
import type { ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance } from '../utils'

export type _ToastOptions = Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover' | 'willBeDestroy'> & {
  duration?: string | number
  // we plan to implement this api in the future.
  once?: boolean
}

export type ToastOptions = Partial<_ToastOptions>

export type StaticToastOptions = Omit<ToastOptions, 'type'>

export type Toasts = Array<
  Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover'> & {
    id: string
    cancel: () => void
    duration?: string | number
  }
>

export interface ToastCotnext {
  toasts: Ref<Toasts>
  updateHovering: (state: boolean) => void
}

export interface ToastInsanceMethods {
  hideToast(id: string, duration: number): void
  updateToasts(toastOptions: ToastOptions, duration: number): void
}

export type TostInstance = ComponentInstance<ToastInsanceMethods>
