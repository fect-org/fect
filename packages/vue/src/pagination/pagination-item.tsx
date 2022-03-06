import { defineComponent, computed } from 'vue'
import { createBem } from '../utils'

const bem = createBem('fect-pagination')

const PaginationItem = defineComponent({
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    active: Boolean
  },
  emits: ['click', 'mouseenter', 'mouseleave'],
  setup(props, { emit, slots, attrs }) {
    const setPaginationItemClass = computed(() => {
      const { disabled, active } = props
      return bem('item', { disabled, active })
    })

    return () => (
      <li>
        <button
          class={setPaginationItemClass.value}
          onClick={(e) => emit('click', e)}
          onMouseenter={(e) => emit('mouseenter', e)}
          onMouseleave={(e) => emit('mouseleave', e)}
          {...attrs}
        >
          {slots.default?.()}
        </button>
      </li>
    )
  }
})

export default PaginationItem
