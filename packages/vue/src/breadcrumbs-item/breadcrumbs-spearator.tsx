import { defineComponent } from 'vue'
import { createBem } from '../utils'

const bem = createBem('fect-breadcrumbs')

const Separator = defineComponent({
  setup(props, { slots }) {
    return () => <div class={bem('separator')}>{slots.default?.()}</div>
  }
})

export default Separator
