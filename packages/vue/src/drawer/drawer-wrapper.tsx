import { defineComponent, PropType } from 'vue'
import { createBem } from '../utils'
import { Placement } from './props'

const bem = createBem('fect-drawer')

export default defineComponent({
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'right'
    },
    closeable: Boolean,
    round: Boolean
  },
  setup(props, { slots }) {
    return () => (
      <div class={bem('wrapper', [props.placement, { round: props.round }])} role="dialog">
        {slots.default?.()}
      </div>
    )
  }
})
