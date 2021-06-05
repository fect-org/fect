import { computed, PropType, CSSProperties } from 'vue'
import { createNameSpace, createProvider } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import './breadcrumbs.less'

const [createComponent] = createNameSpace('Breadcrumbs')

export const READONLY_BREADCRUMBS_KEY = 'breadcrumbsKey'

export type BreadcrumbsProvide = {
  separator: string
}

const queryFontSize = (size: NormalSizes) => {
  const sizesPool: { [key in NormalSizes]: string } = {
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
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
  },
  setup(props, { slots }) {
    const { provider } = createProvider(READONLY_BREADCRUMBS_KEY)
    provider({ separator: props.separator })

    const safeSize = computed(() => {
      const styles: CSSProperties = { fontSize: queryFontSize(props.size) }
      return styles
    })

    return () => (
      <nav class="fect-nav_container" style={safeSize.value}>
        {slots.default?.()}
      </nav>
    )
  },
})
