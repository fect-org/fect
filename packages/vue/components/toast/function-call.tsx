import { App } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import FeToast from './toast'
import { createNode, withInstall, NormalTypes, createPortal, omit, assign, useExpose, isNumber, getId } from '../utils'

import type { ComponentInstance } from '../utils'
import type { ToastOptions, StaticToastOptions, Toasts } from './interface'
import { createToastContext } from './toast-contenxt'

/**
 * Toast will has `once` Api in future.
 */

let instance: ComponentInstance

const destroyStack: string[] = []

const Toast = (options: ToastOptions) => {
  const id = `toast-${getId()}`

  if (!instance) {
    //  context
    const container = createNode('fect-ui--toast')

    ;({ instance } = createPortal(
      {
        setup() {
          const [toasts, setToasts] = useState<Toasts>([])
          const [isHovering, setIsHovering] = useState<boolean>(false)

          const updateToasts = (toastOption: Toasts[number]) => {
            const prevToasts = toasts.value.slice()
            prevToasts.push(omit(toastOption, 'duration'))
            setToasts(prevToasts)
          }

          let maxDestroyTime: number = 0
          let destroyTimer: number | undefined

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
   * user may pass a string type numebr. so we should translate it. Or user pass a string , we will use preset
   * duration value.
   */
  const duration = isNumber(options.duration) ? Number(options.duration) : Toast.defaultOptions.duration
  // instance.setId(id)
  instance.hideToast(id, duration)
  instance.updateToasts(assign(options, { id }))
}

Toast.defaultOptions = {
  duration: 2000,
  text: '',
  type: 'default',
  once: false
} as ToastOptions

const createMethods = (type: NormalTypes) => (options: StaticToastOptions) =>
  Toast(assign(Toast.defaultOptions, options, { type } as ToastOptions))

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
