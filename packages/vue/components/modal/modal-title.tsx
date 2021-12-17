import { defineComponent } from 'vue'
import { useModalContext } from './modal-context'

const ModalTitle = defineComponent({
  setup() {
    const { context } = useModalContext()
    return () => (
      <div class="fect-modal__title">
        <h2 class="title">{context?.props.title}</h2>
      </div>
    )
  }
})

export default ModalTitle
