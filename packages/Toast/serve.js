import { mountRender } from '../utils'
const { mountComponent, initMountArea } = mountRender
import Toast from './toast'

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

const FectToast = ({ ...args }) => {
  /**
   * while toastEvent excute ,it will
   * create toast container area  to save all toast
   */
  const area = initMountArea('fect-toast-area')
  const toastEl = document.querySelector('.fect-toast-container')
  const { unmount, mountNode } = insertToArea(area, Toast, [args])
  /**
   * unload all element at the end of the timer
   */

  setTimeout(() => {
    unmount(area)
    if (!toastEl) {
      document.body.removeChild(area)
    }
  }, 4500)
}

const createMethods = (type) => (option) => {
  Object.assign(option, { type })
  FectToast(option)
}

/**
 * static methods
 */
FectToast.success = createMethods('success')

FectToast.warning = createMethods('warning')

FectToast.error = createMethods('error')

export default FectToast
