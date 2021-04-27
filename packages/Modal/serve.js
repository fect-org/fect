import { mountRender } from '../utils'
import FectModal from './modal'
const { mountComponent } = mountRender

const Modal = ({ ...args }) => {
  const { instance, unmount } = mountComponent(FectModal, args)

  const hasClose = args.visible
  if (hasClose) {
    instance()
  } else {
    unmount()
  }
}

export default Modal
