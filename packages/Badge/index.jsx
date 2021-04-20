import { computed } from 'vue'
import { createNameSpace, theme, validator } from '../utils'
const [createComponent] = createNameSpace('Badge')
import './badge.less'

const { normalTypes, normalSizes } = theme

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
    const calcStyle = computed(() => {
      const styles = {
        backgroundColor: queryBgColor(props.type),
        fontSize: queryFontSize(props.size),
      }
      return styles
    })
    return () => (
      <span
        {...attrs}
        class={`${props.dot ? 'fect-dot' : ''} fect-badge`}
        style={calcStyle.value}
      >
        {!props.dot && slots.default?.()}
      </span>
    )
  },
})
