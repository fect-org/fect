import { CustomCSSProperties } from '../utils/base'
import { computed, defineComponent, PropType } from 'vue'
import { Placement } from './props'
import { getDrawerTransfrom } from './style'

const DrawerWrapper = defineComponent({
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'right',
    },
    closeable: Boolean,
    round: Boolean,
  },
  setup(props, { slots, emit }) {
    const setRounder = computed(() => {
      const { round } = props
      return round && 'round'
    })

    const setDrawerStyle = computed(() => {
      const { placement } = props
      const styles: CustomCSSProperties = {
        '--drawer-transfrom': getDrawerTransfrom(placement),
      }
      return styles
    })

    return () => (
      <div
        class={`fect-drawer__wrapper fect-drawer__wrapper--${props.placement} ${setRounder.value}`}
        style={setDrawerStyle.value}
        role="dialog"
      >
        {slots.default?.()}
      </div>
    )
  },
})

export default DrawerWrapper
