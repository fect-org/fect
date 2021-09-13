import { PropType, defineComponent } from 'vue'
import { createName } from '../utils'
import { NormalTypes } from '../utils/theme/propTypes'
import './index.less'

const name = createName('Dot')

export default defineComponent({
  name,
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
