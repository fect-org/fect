import { App } from 'vue'
import FeModal from './modal'
import { withInstall, isBrowser } from '../utils'

const Modal = (otpions: any) => {
  if (!isBrowser()) return
}

Modal.defaultOptions = {
  title: '',
  width: '400px',
  cancel: 'cancel',
  done: 'done'
}

Modal.confirm = () => {}

Modal.cancel = () => {}

Modal.Component = withInstall(FeModal)

Modal.install = (app: App) => {
  app.use(Modal.Component)
  app.config.globalProperties.$modal = Modal
}

export { Modal }

Modal.confirm().cancel()
