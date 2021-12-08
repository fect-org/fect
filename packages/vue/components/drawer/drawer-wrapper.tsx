import { computed, defineComponent, PropType } from 'vue'
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
  setup(props, { slots, emit }) {
    const setRounder = computed(() => {
      const { round } = props
      return round && 'round'
    })

    return () => (
      <div class={`fect-drawer__wrapper fect-drawer__wrapper--${props.placement} ${setRounder.value}`} role="dialog">
        {slots.default?.()}
      </div>
    )
  }
})

export default DrawerWrapper
