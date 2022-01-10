import { ExtractPropTypes, Ref } from 'vue'
import { props } from './props'

export type _ToastOptions = Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover' | 'willBeDestroy'> & {
  duration?: string | number
  // we plan to implement this api in the future.
  once?: boolean
}

export type ToastOptions = Partial<_ToastOptions>

export type StaticToastOptions = Omit<ToastOptions, 'type'>

export type Toasts = Array<
  Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover'> & { id: string; cancel: () => void }
>

export interface ToastCotnext {
  toasts: Ref<Toasts>
  updateHovering: (state: boolean) => void
}
