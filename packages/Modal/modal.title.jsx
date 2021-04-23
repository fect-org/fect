import { defineComponent } from 'vue'
import { READONLY_MODAL_KEY } from './ModalKey'
import './modal.title.less'

const ModalTitle = defineComponent({
  setup(props, { slots }) {
    const { ctx } = useProvider(READONLY_MODAL_KEY)
    return () => <div>{ctx.title}</div>
  },
})

export default ModalTitle
