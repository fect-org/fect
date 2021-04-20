import { computed, ref } from 'vue'
import { createNameSpace, theme, validator, useProvider } from '../utils'
const [createComponent] = createNameSpace('Badge')
import './badge.less'

const { normalTypes, normalSizes } = theme

const READONLY_BADGE_ANCHOR_KEY = 'badgeAnchorKey'

const queryBgColor = (type) => {
  const bgsPool = {
    default: 'var(--primary-foreground)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)',
  }
  return bgsPool[type]
}

const queryFontSize = (size) => {
  const sizesPool = {
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
      type: String,
      default: 'default',
      validator: validator.enums(normalTypes),
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    dot: Boolean,
  },
  setup(props, { attrs, slots }) {
    const { ctx } = useProvider(READONLY_BADGE_ANCHOR_KEY)
    const hasParent = ref(Boolean(ctx))
    const calcStyle = computed(() => {
      const styles = {
        backgroundColor: queryBgColor(props.type),
        fontSize: queryFontSize(props.size),
      }
      return styles
    })

    const palcementStyle = computed(() => {
      const { top, left, right, value, origin, bottom } = ctx
      const style = {
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
          style={calcStyle.value}
        >
          {!props.dot && slots.default?.()}
        </span>
      )
    }
    return () => (
      <>
        {hasParent.value ? (
          <sup style={palcementStyle.value}>{renderElement()}</sup>
        ) : (
          <>{renderElement()}</>
        )}
      </>
    )
  },
})
