import { defineComponent, ref } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import Button from '../button'
import { READONLY_MODAL_KEY, ModalProvide } from './type'

const ModalAction = defineComponent({
  setup() {
    const { context } = useProvider<ModalProvide>(READONLY_MODAL_KEY)
    const isClose = ref<boolean>(context!.props.visible)

    const handlerCloseClick = () => {
      isClose.value = !isClose.value
      context!.updateVisibleValue(isClose.value)
    }

    return () => (
      <footer class="fect-modal_action__container">
        <Button class="modal_action__btn" onClick={handlerCloseClick}>
          {context?.props.cancel}
        </Button>
        <Button class="modal_action__btn" onClick={handlerCloseClick}>
          {context?.props.done}
        </Button>
      </footer>
    )
  },
})

export default ModalAction
