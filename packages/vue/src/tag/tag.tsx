import { computed, PropType, defineComponent } from 'vue'
import { createName, NormalTypes, createBem, CSSProperties } from '../utils'
import './index.less'

interface Color {
  color: string
}

const name = createName('Tag')
const bem = createBem('fect-tag')

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
    useInvert: Boolean,
    color: String,
    round: Boolean
  },
  setup(props) {
    const setTagStyle = computed(() => {
      const { type, useInvert, color: customColor } = props
      const { color } = customColor ? { color: customColor } : getBgColor(type)

      const customColorStyle: CSSProperties = customColor ? { '--tag-custom-color': color } : {}

      if (useInvert)
        return {
          backgroundColor: color,
          ...customColorStyle
        }
      return customColorStyle
    })

    return () => (
      <div
        class={bem(null, [props.color ? 'custom' : props.type, { invert: props.useInvert, round: props.round }])}
        style={setTagStyle.value}
      >
        {props.text}
      </div>
    )
  }
})
