import { defineComponent } from 'vue'
import { READONLY_MODAL_KEY } from './ModalKey'
import { useProvider } from '../utils'
import Button from '../Button'
import './modal.action.less'

const ModalAction = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_MODAL_KEY)
    return () => (
      <>
        <footer class="fect-modal_action__container">
          <Button class="modal_action__btn">{ctx.cancel}</Button>
          <Button class="modal_action__btn">{ctx.done} </Button>
        </footer>
      </>
    )
  },
})

export default ModalAction
