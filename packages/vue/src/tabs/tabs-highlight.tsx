import { defineComponent, computed } from 'vue'
import { createBem } from '../utils'
import { tabsHighlightProps } from './props'

const bem = createBem('fect-tabs')

export default defineComponent({
  props: tabsHighlightProps,
  setup(props) {
    const setHighlightStyle = computed(() => {
      const { rect, heightRatio, widthRatio, activeOpacity } = props
      if (!rect)
        return {
          'transition-property': 'opacity'
        }
      const width = rect.width * widthRatio!
      const height = rect.height * heightRatio!
      return {
        opacity: props.active ? activeOpacity : 0,
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
