import { defineComponent } from 'vue'
import Button from '../button/index'
import { useModalContext } from './modal-context'
import type { Action } from './interface'

const ModalAction = defineComponent({
  setup() {
    const { context } = useModalContext()

    const closeClickHandler = (e: Event, action: Action) => {
      e.stopPropagation()
      e.preventDefault()
      const { closeModal } = context!
      closeModal(action)
    }

    return () => (
      <footer class="fect-modal__action">
        <Button class="fect-modal__button" onClick={(e) => closeClickHandler(e, 'cancel')}>
          {context!.props.cancel}
        </Button>
        <Button class="fect-modal__button" onClick={(e) => closeClickHandler(e, 'confirm')}>
          {context!.props.done}
        </Button>
      </footer>
    )
  }
})

export default ModalAction
