import { PropType, defineComponent } from 'vue'
import { createName, NormalTypes, createBem } from '../utils'
import './index.less'

const name = createName('Dot')
const bem = createBem('fect-dot')

export default defineComponent({
  name,
  props: {
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default'
    }
  },
  setup(props, { slots }) {
    return () => (
      <div class={bem(null)}>
        <span class={bem('circle', props.type)}></span>
        <span class={bem('ctx')}>{slots.default?.()}</span>
      </div>
    )
  }
})
