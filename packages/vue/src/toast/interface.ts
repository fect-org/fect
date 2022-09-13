import { props } from './props'
import type { DeepReadonly, ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance } from '../utils'

type _ToastOptions = Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover' | 'willBeDestroy'> & {
  duration?: string | number
}

export type ToastOptions = Partial<_ToastOptions>

export type StaticToastOptions = Omit<ToastOptions, 'type'>

export type Toasts = Array<
  Omit<ExtractPropTypes<typeof props>, 'index' | 'total' | 'hover'> &
    ToastInternalOptions & {
      id: string
      duration?: string | number
      __timeout: () => void
    }
>

export interface ToastCotnext {
  isHovering: DeepReadonly<Ref<boolean>>
  toasts: DeepReadonly<Ref<Toasts>>
  updateHovering: (state: boolean) => void
}

export interface ToastInsanceMethods {
  updateToasts(toastOptions: ToastOptions, duration: number): void
}

export type TostInstance = ComponentInstance<ToastInsanceMethods>

export interface ToastAction {
  (): JSX.Element
}

// e: Event, cancel: () => void

export type ToastInternalOptions = Pick<ExtractPropTypes<typeof props>, 'actions' | 'placement' | 'type' | 'text'> & {
  visible: boolean
  cancel: () => void
}
