import { App } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import FeModal from './modal'
import { withInstall, isBrowser, assign, createPortal, useExpose, pick } from '../utils'
import type { ComponentInstance } from '../utils'
import type { StaticModalOptions } from './interface'

const isFunc = (val: any) => typeof val === 'function'

let instance: ComponentInstance

const Modal = (options: StaticModalOptions) => {
  if (!isBrowser()) return
  const staticOptions = assign({}, Modal.defaultOptions, options)

  if (!instance) {
    ;({ instance } = createPortal({
      setup() {
        const [visible, setVisible] = useState<boolean>(false)
        const [modalProps, setModalProps] = useState<typeof staticOptions>({})

        useExpose({ setVisible, setModalProps })

        const confirmHandler = () => {
          setVisible(false)
          if (modalProps.value.confirm) {
            isFunc(modalProps.value.confirm) && modalProps.value.confirm()
          }
        }

        const cancelHandler = () => {
          setVisible(false)
          if (modalProps.value.close) {
            isFunc(modalProps.value.close) && modalProps.value.close()
          }
        }

        return () => (
          <FeModal
            {...pick(modalProps.value, ['title', 'width', 'done', 'cancel', 'disableOverlayClick'])}
            visible={visible.value}
            onCancel={cancelHandler}
            onConfirm={confirmHandler}
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
