import { App, Component, watchEffect, computed, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import FeToast from './toast'
import { createNode, withInstall, NormalTypes, createPortal, omit } from '../utils'

export type ToastType = NormalTypes

export type ToastOptions = {
  text?: string | number
  type?: NormalTypes
  duration?: string | number
}

export type StaticToastOptions = Omit<ToastOptions, 'type'>

export type ToastProps = Omit<ToastOptions, 'duration'>

export const merged = (...rest: any[]) => rest.reduce((acc, cur) => Object.assign(acc, cur), {})

const queue: ToastProps[] = []

const Toast = (options: ToastOptions) => {
  // set max queue
  if (queue.length > 10) queue.splice(10, 1)
  const container = createNode('fect-toast__area')
  queue.push(omit(options, 'duration'))
  const content: Component = {
    setup() {
      const [visible, setVisible] = useState<boolean>(false)

      const [hide, setHide] = useState<boolean>(false)

      watchEffect((onInvalidate) => {
        const timer = setTimeout(() => {
          setVisible(true)
          clearTimeout(timer)
        }, 0)
        onInvalidate(() => {
          clearTimeout(timer)
        })
      })

      watchEffect((onInvalidate) => {
        const timer = setTimeout(() => {
          setHide(true)
          clearTimeout(timer)
        }, Number(options.duration) || 4500)
        onInvalidate(() => {
          clearTimeout(timer)
        })
      })

      watch(hide, (pre) => {
        if (pre) queue.length = 0
      })

      const setOpacity = computed(() => (hide.value ? 0 : 1))

      return () => (
        <div>
          {queue.map((item, idx) => (
            <div
              class={`fect-toast__container ${visible.value ? 'visible' : ''}`}
              style={{ opacity: setOpacity.value }}
              data-index={idx}
            >
              <FeToast {...item} />
            </div>
          ))}
        </div>
      )
    },
  }
  createPortal(content, container)
}

const createMethods = (type: NormalTypes) => (options: StaticToastOptions) => Toast(merged(options, { type }))

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
