import { props } from './props'
import type { DeepReadonly, ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance, PlaceTypes } from '../utils'

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
      __timeout: null | number
    }
>

export interface ToastCotnext {
  toasts: DeepReadonly<Ref<Toasts>>
  layout: DeepReadonly<Ref<PlaceTypes>>
}

export interface ToastInsanceMethods {
  updateLayout(next: PlaceTypes): void
  updateToasts(toastOptions: ToastOptions, duration: number): void
  removeAll(): void
}

export type TostInstance = ComponentInstance<ToastInsanceMethods>

export interface ToastAction {
  (cancel?: () => void): JSX.Element
}

// e: Event, cancel: () => void

export type ToastInternalOptions = Pick<ExtractPropTypes<typeof props>, 'actions' | 'placement' | 'type' | 'text'> & {
  visible: boolean
  cancel: () => void
}
