import { computed, CSSProperties, PropType } from 'vue'
import { createNameSpace } from '../utils'
import { useProvider } from '@fect-ui/vue-hooks'
import { NormalSizes, NormalTypes } from '../utils/theme/propTypes'
import {
  BadgeAnchorProvide,
  READONLY_BADGE_ANCHOR_KEY,
} from '../badge-anchor/index'
import './index.less'

const [createComponent] = createNameSpace('Badge')

export const queryBgColor = (type: NormalTypes) => {
  const bgsPool: { [key in NormalTypes]: string } = {
    default: 'var(--primary-foreground)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)',
  }
  return bgsPool[type]
}

export const queryFontSize = (size: NormalSizes) => {
  const sizesPool: { [key in NormalSizes]: string } = {
    mini: '11px',
    small: '12px',
    medium: '14px',
    large: '16px',
  }
  return sizesPool[size]
}

export default createComponent({
  props: {
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default',
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    dot: Boolean,
  },
  setup(props, { slots, attrs }) {
    const { context } = useProvider<BadgeAnchorProvide>(
      READONLY_BADGE_ANCHOR_KEY,
    )

    const hasParent = computed(()=>{
      if (context) return true
      return false
    })

    const setStyle = computed(() => {
      const styles: CSSProperties = {
        backgroundColor: queryBgColor(props.type),
        fontSize: queryFontSize(props.size),
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
        zIndex: 1,
      }
      return style
    })

    const renderElement = () => {
      return (
        <span
          {...attrs}
          class={`${props.dot ? 'fect-dot' : ''} fect-badge`}
          style={setStyle.value}
        >
          {!props.dot && slots.default?.()}
        </span>
      )
    }
    return () => (
      <>
        {hasParent.value ? (
          <sup style={placementStyle.value}>{renderElement()}</sup>
        ) : (
          <>{renderElement()}</>
        )}
      </>
    )
  },
})
