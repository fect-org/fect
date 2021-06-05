import FeToast from './toast'
import { App } from 'vue'
import { initMountArea, mountComponent } from '../utils'
import { NormalTypes } from '../utils/theme/propTypes'

export type ToastOptions = {
  text?: string | number
  type?: NormalTypes
  duration?: string | number
}

const insertToArea = (duraion: number | string | undefined) => {
  const toastEl = document.querySelector('.fect-toast-container') as HTMLElement
  return new Promise((resolve) => {
    /**
     * unload all element at the end of the timer
     * support custom duration
     */
    const _t = Number(duraion) || 4500
    const _timer = setTimeout(() => {
      toastEl.setAttribute('style', 'opacity: 0;')
      clearTimeout(_timer)
      resolve(true)
    }, _t)
  })
}

const createInstance = (options: ToastOptions) => {
  const { mountNode } = mountComponent({
    setup() {
      return () => <FeToast {...options} />
    },
  })

  return { mountNode }
}

const getInstance = (options: ToastOptions) => {
  const area = initMountArea('fect-toast-area')
  const { mountNode } = createInstance(options)
  mountNode.classList.add('fect-toast-container')
  const timer = setTimeout(() => {
    mountNode.classList.add('visible')
    clearTimeout(timer)
  }, 0)
  area.appendChild(mountNode)
  insertToArea(options.duration).then((res) => {
    if (res) {
      area.removeChild(mountNode)
      if (area.childNodes.length === 0) document.body.removeChild(area)
    }
  })
}

const Toast = (options: ToastOptions) => getInstance(options)

const createMethods = (type: NormalTypes) => (options: ToastOptions) => {
  Object.assign(options, { type })
  Toast(options)
}

/**
 * static methods
 */
Toast.success = createMethods('success')

Toast.warning = createMethods('warning')

Toast.error = createMethods('error')

Toast.install = (app: App) => {
  app.use(FeToast as any)
  app.config.globalProperties.$toast = Toast
}

export default Toast
