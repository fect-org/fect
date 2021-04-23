import { defineComponent, ref } from 'vue'
import { READONLY_MODAL_KEY } from './ModalKey'
import { useProvider } from '../utils'
import Button from '../Button'
import './modal.action.less'

const ModalAction = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_MODAL_KEY)
    const isClose = ref(ctx.props.visible)

    const handlerCloseClick = () => {
      isClose.value = !isClose.value
      ctx.updateVisibleValue(isClose.value)
    }

    return () => (
      <>
        <footer class="fect-modal_action__container">
          <Button class="modal_action__btn" onClick={handlerCloseClick}>
            {ctx.props.cancel}
          </Button>
          <Button class="modal_action__btn" onClick={handlerCloseClick}>
            {ctx.props.done}
          </Button>
        </footer>
      </>
    )
  },
})

export default ModalAction
