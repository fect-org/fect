import { defineComponent, computed, CSSProperties } from 'vue'

const IconContent = defineComponent({
  props: {
    clickable: Boolean
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const baseStyle = computed(() => {
      const style: CSSProperties = {
        cursor: !props.clickable ? 'pointer' : 'default',
        pointerEvents: !props.clickable ? 'auto' : 'none'
      }
      return style
    })

    return () => (
      <div class="fect-input__icon fect-input__icon-suffix" style={baseStyle.value} onClick={(e) => emit('click', e)}>
        {slots.default?.()}
      </div>
    )
  }
})

export default IconContent
