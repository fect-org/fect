import { props } from './props'
import type { DeepReadonly, ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance } from '../utils'

type _ToastOptions = Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover' | 'willBeDestroy'> & {
  duration?: string | number
  once?: boolean
}

export type ToastOptions = Partial<_ToastOptions>

export type StaticToastOptions = Omit<ToastOptions, 'type'>

export type Toasts = Array<
  Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover'> & {
    id: string
    cancel(): void
    duration?: string | number
  }
>

export interface ToastCotnext {
  toasts: DeepReadonly<Ref<Toasts>>
  updateHovering: (state: boolean) => void
}

export interface ToastInsanceMethods {
  hideToast(id: string, duration: number): void
  updateToasts(toastOptions: ToastOptions, duration: number): void
}

export type TostInstance = ComponentInstance<ToastInsanceMethods>
