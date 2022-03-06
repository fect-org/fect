import { defineComponent } from 'vue'
import { createBem } from '../utils'

const bem = createBem('fect-input')

export default defineComponent({
  props: {
    suffix: Boolean,
    prefix: Boolean
  },
  setup(props, { slots }) {
    return () => <span class={bem('label', { suffix: props.suffix, prefix: props.prefix })}>{slots.default?.()}</span>
  }
})
