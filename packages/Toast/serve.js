import { mountRender } from '../utils'
const { mountComponent, initMountArea } = mountRender
import FectToast from './toast'

const insertToArea = (cont, elComponent, args) => {
  const { instance, unmount, mountNode } = mountComponent(elComponent, ...args)
  /**
   * It will  create anonymous el ,so you need to name them
   */
  mountNode.classList.add('fect-toast-container')
  /**
   * Set timer delay here to add style visible
   */
  const timer = setTimeout(() => {
    mountNode.classList.add('visible')
    clearTimeout(timer)
  }, 0)
  instance()
  cont.appendChild(mountNode)
  return { unmount, mountNode }
}

const Toast = ({ ...args }) => {
  /**
   * while toastEvent excute ,it will
   * create toast container area  to save all toast
   */
  const area = initMountArea('fect-toast-area')
  const duration = args?.duration
  const toastEl = document.querySelector('.fect-toast-container')
  const { unmount, mountNode } = insertToArea(area, FectToast, [args])
  /**
   * unload all element at the end of the timer
   * support custom duration
   */

  const _t = Number(duration) ? Number(duration) : 4500
  const _timer = setTimeout(() => {
    mountNode.setAttribute('style', 'opacity: 0;')
    if (!!mountNode.style.opacity) {
      unmount(area)
      if (!toastEl) {
        document.body.removeChild(area)
        clearTimeout(_timer)
      }
    }
  }, _t)
}

const createMethods = (type) => (option) => {
  Object.assign(option, { type })
  Toast(option)
}

/**
 * static methods
 */
Toast.success = createMethods('success')

Toast.warning = createMethods('warning')

Toast.error = createMethods('error')

export default Toast
