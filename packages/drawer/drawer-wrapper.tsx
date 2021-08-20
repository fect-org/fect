import { defineComponent, PropType } from 'vue'
import { Placement } from './props'

const DrawerWrapper = defineComponent({
  props: {
    visible: Boolean,
    placement: String as PropType<Placement>,
  },
  setup(props, { slots, emit }) {
    return (
      <div class="fect-drawer__wrapper" role="dialog">
        {slots.default?.()}
      </div>
    )
  },
})

export default DrawerWrapper
