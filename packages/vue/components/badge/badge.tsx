import { computed, defineComponent, CSSProperties, PropType } from 'vue'
import { createName, NormalSizes, NormalTypes } from '../utils'
import { useProvider } from '@fect-ui/vue-hooks'
import { BadgeAnchorProvide, READONLY_BADGE_ANCHOR_KEY } from '../badge-anchor/badge-anchor'
import './index.less'

const name = createName('Badge')

export const queryBgColor = (type: NormalTypes) => {
  const bgsPool: { [key in NormalTypes]: string } = {
    default: 'var(--primary-foreground)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)'
  }
  return bgsPool[type]
}

export const queryFontSize = (size: NormalSizes) => {
  const sizesPool: { [key in NormalSizes]: string } = {
    mini: '11px',
    small: '12px',
    medium: '14px',
    large: '16px'
  }
  return sizesPool[size]
}

export default defineComponent({
  name,
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
    const parent = useProvider<BadgeAnchorProvide>(READONLY_BADGE_ANCHOR_KEY)
    const { context } = parent
    const hasParent = computed(() => {
      if (context) return true
      return false
    })

    const setStyle = computed(() => {
      const styles: CSSProperties = {
        backgroundColor: queryBgColor(props.type),
        fontSize: queryFontSize(props.size)
      }
      return styles
    })

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
      return (
        <span {...attrs} class={`${props.dot ? 'fect-dot' : ''} fect-badge`} style={setStyle.value}>
          {!props.dot && slots.default?.()}
        </span>
      )
    }
    return () => (
      <>{hasParent.value ? <sup style={placementStyle.value}>{renderElement()}</sup> : <>{renderElement()}</>}</>
    )
  }
})
