import { computed, defineComponent, CSSProperties, PropType } from 'vue'
import Dot from '../dot'
import { createName, NormalSizes, NormalTypes } from '../utils'
import { useBadgeContext } from '../badge-anchor/badge-context'
import './index.less'

const name = createName('Badge')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default'
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    },
    dot: Boolean
  },
  setup(props, { slots, attrs }) {
    const { context } = useBadgeContext()

    const placementStyle = computed(() => {
      const { top, left, right, value, origin, bottom } = context!
      const style: CSSProperties = {
        position: 'absolute',
        top: `${top || 'auto'}`,
        left: `${left || 'auto'}`,
        right: `${right || 'auto'}`,
        bottom: `${bottom || 'auto'}`,
        transform: `${value}`,
        transformOrigin: `${origin}`,
        zIndex: 1
      }
      return style
    })

    const renderElement = () => {
      if (props.dot) return <Dot class="fect-badge__dot" type={props.type} {...attrs} />
      return (
        <span class={`fect-badge fect-badge--${props.type} fect-badge--${props.size}`} {...attrs}>
          {slots.default?.()}
        </span>
      )
    }

    return () => {
      if (context) {
        return <sup style={placementStyle.value}>{renderElement()}</sup>
      }
      return renderElement()
    }
  }
})
