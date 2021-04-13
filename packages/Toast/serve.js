import { mountRender } from '../utils'
const { mountComponent, initMountArea } = mountRender
import Toast from './toast'

const insertToArea = (cont, elComponent, args) => {
  const { instance, unmount, mountNode } = mountComponent(elComponent, ...args)
  /**
   *
   * It will  create anonymous el ,so you need to name them
   */
  mountNode.setAttribute('class', 'fect-toast-container visible')
  instance()
  cont.appendChild(mountNode)
  return { unmount }
}

const FectToast = (...args) => {
  /**
   * while toastEvent excute ,it will
   * create toast container area  to save all toast
   */
  const area = initMountArea('fect-toast-area')
  const { unmount } = insertToArea(area, Toast, args)
  /**
   * unload all element at the end of the timer
   */
  setTimeout(() => {
    // unmount(area)
    // document.body.removeChild(area)
    clearTimeout()
  }, 4500)
}

export default FectToast
