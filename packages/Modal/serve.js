import { mountRender } from '../utils'
import FectModal from './modal'
const { mountComponent } = mountRender

const Modal = ({ ...args }) => {
  const { instance, unmount } = mountComponent(FectModal, args)

  const hasClose = FectModal.props.visible()
  if (hasClose) {
    unmount()
  } else {
    instance()
  }
}

export default Modal
