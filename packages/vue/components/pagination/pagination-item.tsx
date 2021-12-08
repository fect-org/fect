import { defineComponent, computed } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { addColorAlpha, CustomCSSProperties } from '../utils'
import { READONLY_PAGINATION_KEY, PaginationProvide } from './type'

const hoverable = (): string[] => {
  const hover = addColorAlpha('#0070f3', 0.1)
  const activeHover = addColorAlpha('#0070f3', 0.8)
  return [hover, activeHover]
}

const PaginationItem = defineComponent({
  props: {
    disabled: Boolean,
    active: Boolean
  },
  emits: ['click', 'mouseenter', 'mouseleave'],
  setup(props, { emit, slots }) {
    const { context } = useProvider<PaginationProvide>(READONLY_PAGINATION_KEY)

    const gethoverable = computed(() => {
      const [hover, activeHover] = hoverable()
      return {
        '--pagination-hover': hover,
        '--pagination-activeHover': activeHover
      } as CustomCSSProperties
    })

    const queryClass = computed(() => {
      if (props.disabled) return 'disabled'
      return props.active ? 'active' : ''
    })

    const queryModeClass = computed(() => {
      return context!.props.simple ? 'pagination-simple__side' : 'pagination-item__button'
    })

    return () => (
      <li>
        <button
          class={`${queryModeClass.value} ${queryClass.value} `}
          style={gethoverable.value}
          onClick={(e) => emit('click', e)}
          onMouseenter={(e) => emit('mouseenter', e)}
          onMouseleave={(e) => emit('mouseleave', e)}
        >
          {slots.default?.()}
        </button>
      </li>
    )
  }
})

export default PaginationItem
