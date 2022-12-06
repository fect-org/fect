import { defineComponent, computed, CSSProperties } from 'vue'
import { createBem } from '../utils'

const bem = createBem('fect-input')

export default defineComponent({
  props: {
    clickable: Boolean,
    suffix: Boolean,
    prefix: Boolean
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const setInputIconContentStyle = computed(() => {
      const style: CSSProperties = {
        cursor: props.clickable ? 'pointer' : 'default',
        pointerEvents: props.clickable ? 'auto' : 'none'
      }
      return style
    })

    return () => (
      <div
        class={bem('icon', { prefix: props.prefix, suffix: props.suffix })}
        style={setInputIconContentStyle.value}
        onClick={(e) => emit('click', e)}
      >
        {slots.default?.()}
      </div>
    )
  }
})
