import { defineComponent, computed } from 'vue'
import './icon-content.less'

const IconContent = defineComponent({
  props: {
    clickable: Boolean,
  },
  emits: ['click'],
  setup(props, { slots }) {
    const baseStyle = computed(() => {
      const style = {
        cursor: props.clickable ? 'pointer' : 'default',
        PointerEvetns: props.clickable ? 'auto' : 'none',
      }
      return style
    })

    return () => (
      <div className="input-icon" style={baseStyle.value}>
        {slots.default?.()}
      </div>
    )
  },
})

export default IconContent
