import { defineComponent } from 'vue'
import { createBem } from '../utils'

const bem = createBem('fect-breadcrumbs')

export default defineComponent({
  setup(props, { slots }) {
    return () => <div class={bem('separator')}>{slots.default?.()}</div>
  }
})
