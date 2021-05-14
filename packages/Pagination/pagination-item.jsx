import { defineComponent, computed, ref } from 'vue'
import { color, useProvider } from '../utils'

const { addColorAlpha } = color

const READONLY_PAGINATION_KEY = 'paginationKey'

const hoverable = () => {
  const hover = addColorAlpha('#0070f3', 0.1)
  const activeHover = addColorAlpha('#0070f3', 0.8)
  return [hover, activeHover]
}

const PaginationItem = defineComponent({
  props: {
    disabled: Boolean,
    active: Boolean,
  },
  emits: ['click', 'mouseenter', 'mouseleave'],
  setup(props, { emit, slots, attrs }) {
    const ButtonRef = ref(null)
    const { ctx } = useProvider(READONLY_PAGINATION_KEY)
    const gethoverable = computed(() => {
      const [hover, activeHover] = hoverable()
      return {
        '--pagination-hover': hover,
        '--pagination-activeHover': activeHover,
      }
    })

    const handleClick = (e) => emit('click', e)

    const queryClass = computed(() => {
      const className = ['disabled', 'active']

      if (props.disabled) {
        return className[0]
      }
      return props.active ? className[1] : ''
    })

    const queryModeClass = computed(() => {
      return ctx.simple.value
        ? 'pagination-simple__side'
        : 'pagination-item__button'
    })

    return () => (
      <li>
        <button
          ref={ButtonRef}
          class={`${queryModeClass.value} ${queryClass.value} `}
          style={gethoverable.value}
          onClick={handleClick}
          onMouseenter={(e) => emit('mouseenter', e)}
          onMouseleave={(e) => emit('mouseleave', e)}
          {...attrs}
        >
          {slots.default?.()}
        </button>
      </li>
    )
  },
})

export default PaginationItem
