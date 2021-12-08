import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_MODAL_KEY, ModalProvide } from './type'

const ModalTitle = defineComponent({
  setup() {
    const { context } = useProvider<ModalProvide>(READONLY_MODAL_KEY)
    return () => (
      <div class="fect-modal__title">
        <h2 class="title">{context?.props.title}</h2>
      </div>
    )
  }
})

export default ModalTitle
