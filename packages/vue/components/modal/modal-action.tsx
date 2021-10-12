import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import Button from '../button/index'
import { READONLY_MODAL_KEY, ModalProvide } from './type'

const ModalAction = defineComponent({
  setup() {
    const { context } = useProvider<ModalProvide>(READONLY_MODAL_KEY)

    const closeClickHandler = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      const { setSelfVisible } = context!
      const { visible } = context?.props!
      setSelfVisible(!visible)
    }

    return () => (
      <footer class="fect-modal__action">
        <Button class="fect-modal__button" onClick={closeClickHandler}>
          {context?.props.cancel}
        </Button>
        <Button class="fect-modal__button" onClick={closeClickHandler}>
          {context?.props.done}
        </Button>
      </footer>
    )
  },
})

export default ModalAction
