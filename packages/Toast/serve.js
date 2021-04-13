import { mountRender } from '../utils'
const { mountComponent, initMountArea } = mountRender
import Toast from './toast'

const insertToArea = (cont, elComponent, args) => {
  const { instance, unmount, mountNode } = mountComponent(elComponent, ...args)
  mountNode.classList.add('fect-toast-container')
  instance()
  cont.appendChild(mountNode)
  return { unmount }
}

const FectToast = (...args) => {
  const area = initMountArea('fect-toast-area')
  const { unmount } = insertToArea(area, Toast, args)
  setTimeout(() => {
    unmount(area)
    document.body.removeChild(area)
  }, 2000)
}

export default FectToast
