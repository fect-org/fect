import { useState, useExpose } from '@fect-ui/vue-hooks'
import FeToast from './toast'
import { createNode, withInstall, createPortal, assign, isNumber, getId } from '../utils'
import { createToastContext } from './toast-contenxt'
import type { App } from 'vue'
import type { ToastOptions, StaticToastOptions, Toasts, TostInstance, ToastInsanceMethods } from './interface'
import type { PlaceTypes, NormalTypes } from '../utils'

let instance: TostInstance | null = null

const toastDefaultOptions = {
  duration: 4500,
  type: 'default',
  placement: 'bottomRight'
} as Required<ToastOptions> & {
  duration: number
}

const Toast = (options: ToastOptions) => {
  const id = `toast-${getId()}`

  if (!instance) {
    // root node
    const container = createNode('fect-ui--toast')

    ;({ instance } = createPortal<ToastInsanceMethods>(
      {
        setup() {
          const [toasts, setToasts] = useState<Toasts>([])
          const [layout, setLayout] = useState<PlaceTypes>('bottomRight')

          const updateToasts = (toastOption: Toasts[number], duration: number) => {
            const next: Toasts[number] = {
              duration,
              ...toastOption,
              __timeout: window.setTimeout(() => {
                cancel(toastOption.id)
                if (next.__timeout) {
                  window.clearTimeout(next.__timeout)
                  next.__timeout = null
                }
              }, duration),
              cancel: () => cancel(toastOption.id)
            }
            setToasts((pre) => pre.concat(next))
          }

          const updateLayout = (nextPlacement: PlaceTypes) => {
            if (layout.value === nextPlacement) return
            setLayout(nextPlacement)
          }

          const cancel = (id: string) => {
            setToasts((pre) => pre.map((item) => (item.id !== id ? item : assign(item, { visible: false }))))
          }

          const removeAll = () => setToasts([])

          const { provider } = createToastContext()

          provider({ toasts, layout })

          useExpose({ updateToasts, updateLayout, removeAll })
          return () => <FeToast />
        }
      },
      container
    ))
  }

  const { duration: userDuration, ...rest } = options
  const duration = isNumber(userDuration) ? Number(userDuration) : toastDefaultOptions.duration
  instance.updateLayout(rest.placement || toastDefaultOptions.placement)
  instance.updateToasts(assign({ id, visible: true }, toastDefaultOptions, rest), duration)
}

const createMethods = (type: NormalTypes) => (options: StaticToastOptions) =>
  Toast(assign({}, toastDefaultOptions, options, { type }))

/**
 * static methods
 */
Toast.success = createMethods('success')

Toast.warning = createMethods('warning')

Toast.error = createMethods('error')

Toast.removeAll = () => {
  if (instance) instance.removeAll()
}

Toast.Component = withInstall(FeToast)

Toast.install = (app: App) => {
  app.use(Toast.Component)
  app.config.globalProperties.$toast = Toast
}

export { Toast }
