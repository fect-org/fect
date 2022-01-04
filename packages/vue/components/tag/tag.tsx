import { computed, PropType, defineComponent } from 'vue'
import { createName, NormalTypes } from '../utils'
import './index.less'

interface Color {
  color: string
}

const name = createName('Tag')

const getBgColor = (type: NormalTypes) => {
  const colors: Record<NormalTypes, Color> = {
    default: {
      color: 'var(--tag-default-color)'
    },
    success: {
      color: 'var(--tag-success-color)'
    },
    warning: {
      color: 'var(--tag-warning-color)'
    },
    error: {
      color: 'var(--tag-error-color)'
    }
  }

  return colors[type]
}

export default defineComponent({
  name,
  props: {
    text: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default'
    },
    useInvert: Boolean
  },
  setup(props) {
    const setTagStyle = computed(() => {
      const { type, useInvert } = props
      const { color } = getBgColor(type)
      if (useInvert)
        return {
          backgroundColor: color
        }
      return {}
    })

    return () => (
      <div
        class={`fect-tag fect-tag--${props.type} ${props.useInvert ? 'fect-tag--invert' : ''}`}
        style={setTagStyle.value}
      >
        {props.text}
      </div>
    )
  }
})
