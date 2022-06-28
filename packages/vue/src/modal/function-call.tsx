import { useState, useExpose } from '@fect-ui/vue-hooks'
import FeModal from './modal'
import { withInstall, isBrowser, assign, createPortal, pick, isFunc } from '../utils'
import type { App } from 'vue'
import type { StaticModalOptions, StaticModalInstance, Action } from './interface'

let instance: StaticModalInstance

const Modal = (options: StaticModalOptions) => {
  if (!isBrowser()) return
  const staticOptions = assign({}, Modal.defaultOptions, options)

  if (!instance) {
    ;({ instance } = createPortal({
      setup() {
        const [visible, setVisible] = useState<boolean>(false)
        const [modalProps, setModalProps] = useState<typeof staticOptions>({})

        useExpose({ setVisible, setModalProps })

        const clickHandler = (action: Action) => {
          setVisible(false)
          const { close, confirm } = modalProps.value
          if (action === 'confirm') {
            isFunc(confirm) && confirm()
          }
          if (action === 'cancel') {
            isFunc(close) && close()
          }
        }

        return () => (
          <FeModal
            {...pick(modalProps.value, ['title', 'width', 'done', 'cancel', 'disableOverlayClick'])}
            visible={visible.value}
            onCancel={() => clickHandler('cancel')}
            onConfirm={() => clickHandler('confirm')}
          >
            {modalProps.value.content}
          </FeModal>
        )
      }
    }))
  }
  instance.setModalProps(staticOptions)
  instance.setVisible(true)
}

Modal.defaultOptions = {
  title: '',
  width: '400px',
  cancel: 'cancel',
  done: 'done'
} as StaticModalOptions

Modal.Component = withInstall(FeModal)

Modal.install = (app: App) => {
  app.use(Modal.Component)
  app.config.globalProperties.$modal = Modal
}

export { Modal }
