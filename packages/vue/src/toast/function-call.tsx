import { App } from 'vue'
import { useState, useExpose } from '@fect-ui/vue-hooks'
import FeToast from './toast'
import { createNode, withInstall, NormalTypes, createPortal, omit, assign, isNumber, getId, len } from '../utils'
import { createToastContext } from './toast-contenxt'
import type { ToastOptions, StaticToastOptions, Toasts, TostInstance, ToastInsanceMethods } from './interface'

/**
 * Toast will has `once` Api in future.
 */

let instance: TostInstance

const destroyStack: string[] = []

const Toast = (options: ToastOptions) => {
  const id = `toast-${getId()}`

  if (!instance) {
    //  context
    const container = createNode('fect-ui--toast')

    ;({ instance } = createPortal<ToastInsanceMethods>(
      {
        setup() {
          const [toasts, setToasts] = useState<Toasts>([])
          const [isHovering, setIsHovering] = useState<boolean>(false)

          const updateToasts = (toastOption: Toasts[number], duration: number) => {
            const prevToasts = toasts.value.slice()
            prevToasts.push(assign(omit(toastOption, ['duration']), { cancel: () => cancel(toastOption.id, duration) }))
            setToasts(prevToasts)
          }

          let maxDestroyTime = 0
          let destroyTimer: number | undefined

          const destroyAllToast = (delay: number, time: number) => {
            if (time <= maxDestroyTime) return
            clearTimeout(destroyTimer)
            maxDestroyTime = time
            destroyTimer = window.setTimeout(() => {
              if (destroyStack.length < toasts.value.length) {
                setToasts(toasts.value)
              } else {
                destroyStack.length = 0
                setToasts([])
              }
              clearTimeout(destroyTimer)
            }, delay + 350)
          }

          const cancel = (id: string, delay: number) => {
            const prevToasts = toasts.value.slice()
            const nextToasts = prevToasts.map((item) => {
              if (item.id !== id) return item
              return { ...item, willBeDestroy: true }
            })
            destroyStack.push(id)
            setToasts(nextToasts)
            destroyAllToast(delay, performance.now())
          }

          const hideToast = (id: string, delay: number) => {
            const hideTimer = window.setTimeout(() => {
              if (isHovering.value) {
                hideToast(id, delay)
                return clearTimeout(hideTimer)
              }
              cancel(id, delay)
              clearTimeout(hideTimer)
            }, delay)
          }

          const { provider } = createToastContext()

          provider({ toasts, updateHovering: setIsHovering })

          useExpose({ updateToasts, hideToast })

          return () => <FeToast />
        }
      },
      container
    ))
  }

  /**
   * user may pass a string type numebr. so we should translate it. Or user pass a real string can't convert to number , we will use preset
   * duration value.
   */
  const { duration: userDuration } = options
  const duration = isNumber(userDuration) ? Number(userDuration) : Toast.defaultOptions.duration
  instance.hideToast(id, duration)
  instance.updateToasts(assign(options, { id }), duration)
}

Toast.defaultOptions = {
  duration: 4500,
  text: '',
  type: 'default',
  once: false,
  closeAble: false
}

/**
 * At previous version. user  call Toast or Toast static methods. the assign logic is unreasonable.
 * Because we only call createMethods for static methods. But we don't provide a preset config for normal call.
 */

const createMethods = (type: NormalTypes) => (options: StaticToastOptions) =>
  Toast(assign(Toast.defaultOptions, options, { type }))

/**
 * static methods
 */
Toast.success = createMethods('success')

Toast.warning = createMethods('warning')

Toast.error = createMethods('error')

Toast.Component = withInstall(FeToast)

Toast.install = (app: App) => {
  app.use(Toast.Component)
  app.config.globalProperties.$toast = Toast
}

export { Toast }
