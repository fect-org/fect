import { computed } from 'vue'
import { createNameSpace, theme, validator, createProvider } from '../utils'
const [createComponent] = createNameSpace('Breadcrumbs')
import './breadcrumbs.less'

const { normalSizes } = theme

const READONLY_BREADCRUMBS_KEY = 'breadcrumbsKey'

const queryFontSize = (size) => {
  const sizesPool = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return sizesPool[size]
}

export default createComponent({
  props: {
    separator: {
      type: String,
      default: '/',
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_BREADCRUMBS_KEY)
    provider({ separator: props.separator })

    const safeSize = computed(() => {
      const styles = {
        fontSize: queryFontSize(props.size),
      }
      return styles
    })

    return () => (
      <nav class="fect-nav_container" style={safeSize.value}>
        {slots.default?.()}
      </nav>
    )
  },
})
