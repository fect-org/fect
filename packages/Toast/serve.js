import { mountRender } from '../utils'
const { mountComponent, initMountArea } = mountRender
import FectToast from './toast'

const insertToArea = (cont, elComponent, args) => {
  console.log(args)
  const { instance, unmount, mountNode } = mountComponent(elComponent, ...args)
  /**
   *
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
  console.log(args)
  const toastEl = document.querySelector('.fect-toast-container')
  const { unmount } = insertToArea(area, FectToast, [args])
  /**
   * unload all element at the end of the timer
   */

  const _timer = setTimeout(() => {
    unmount(area)
    if (!toastEl) {
      document.body.removeChild(area)
      clearTimeout(_timer)
    }
  }, 4500)
}

const createMethods = (type) => (option) => {
  // Object.assign(option, { type })
  FectToast(option)
}

/**
 * static methods
 */
Toast.success = createMethods('success')

Toast.warning = createMethods('warning')

Toast.error = createMethods('error')

export default Toast
