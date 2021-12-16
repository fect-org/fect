import { defineComponent, PropType } from 'vue'
import { Placement } from './props'

const DrawerWrapper = defineComponent({
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
      <div
        class={`fect-drawer__wrapper fect-drawer__wrapper--${props.placement} ${props.round ? 'round' : ''}`}
        role="dialog"
      >
        {slots.default?.()}
      </div>
    )
  }
})

export default DrawerWrapper
