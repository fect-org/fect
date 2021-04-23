import { defineComponent } from 'vue'
import { useProvider } from '../utils'
import { READONLY_MODAL_KEY } from './ModalKey'
import './modal.title.less'

const ModalTitle = defineComponent({
  props: {
    useSlot: Boolean,
  },
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_MODAL_KEY)
    return () => (
      <div class="fect-modal_title__container">
        <h2 class="modal_title">{ctx.props.title}</h2>
      </div>
    )
  },
})

export default ModalTitle
