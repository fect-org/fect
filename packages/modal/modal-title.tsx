import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_MODAL_KEY, ModalProvide } from './type'

const ModalTitle = defineComponent({
  setup() {
    const { context } = useProvider<ModalProvide>(READONLY_MODAL_KEY)
    return () => (
      <div class="fect-modal_title__container">
        <h2 class="modal_title">{context?.props.title}</h2>
      </div>
    )
  },
})

export default ModalTitle
