import { defineComponent, computed } from 'vue'
import { createBem, noop } from '../utils'

const bem = createBem('fect-tabs')

export default defineComponent({
  props: {
    active: Boolean,
    rect: {
      type: Object,
      default: noop
    },
    heightRatio: Number,
    widthRatio: Number
  },
  setup(props) {
    const setHighlightStyle = computed(() => {
      const { rect, heightRatio, widthRatio } = props
      if (!rect)
        return {
          'transition-property': 'opacity'
        }
      const width = rect.width * widthRatio!
      const height = rect.height * heightRatio!
      return {
        opacity: props.active ? 0.8 : 0,
        width: `${width}px`,
        left: `${rect.left + (rect.width - width) / 2}px`,
        height: `${height}px`,
        top: `${rect.elementTop + (rect.height - height) / 2}px`,
        'transition-property': 'opacity, width, left, top'
      }
    })
    return () => <div class={bem('highlight', { active: props.active })} style={setHighlightStyle.value} />
  }
})
