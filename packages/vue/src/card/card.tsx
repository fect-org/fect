import { computed, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import './index.less'

const name = createName('Card')
const bem = createBem('fect-card')

export default defineComponent({
  name,
  props: {
    hoverable: Boolean,
    shadow: Boolean
  },
  setup(props, { slots }) {
    const setCardClass = computed(() => {
      const { shadow, hoverable } = props
      return bem(null, { shadow, hoverable })
    })

    return () => (
      <div class={setCardClass.value}>
        <div class={bem('content')}>{slots.default?.()}</div>
      </div>
    )
  }
})
