import { PropType } from 'vue'
import { createNameSpace } from '../utils'
import { NormalTypes } from '../utils/theme/propTypes'
import './index.less'

const [createComponent] = createNameSpace('Dot')

export default createComponent({
  props: {
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default',
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="fect-dot">
        <span class={`fect-dot__circle fect-dot__circle--${props.type}`}></span>
        <span class="fect-dot__ctx">{slots.default?.()}</span>
      </div>
    )
  },
})
