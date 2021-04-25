import FectModal from './modal'
import Modal from './serve'

Modal.install = (vue) => {
  vue.use(FectModal)
  vue.config.globalProperties.$modal = Modal
}

export default Modal
