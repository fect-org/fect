import { defineComponent } from 'vue'
import { READONLY_MODAL_KEY } from './ModalKey'
import { useProvider } from '../utils'
import './modal.action.less'
const ModalAction = defineComponent({
  setup() {
    const { ctx } = useProvider(READONLY_MODAL_KEY)
    return () => (
      <>
        <div>
          {ctx.done}
          {ctx.cancel}
        </div>
      </>
    )
  },
})

export default ModalAction
