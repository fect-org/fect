import { computed, toRefs, ref, watchEffect } from 'vue'
import { createNameSpace, theme, validator } from '../utils'
import './tag.less'

const [createComponent] = createNameSpace('Tag')
const { normalTypes } = theme

const queryColors = (type, invert) => {
  const colors = {
    default: {
      color: 'var(--primary-foreground)',
    },
    success: {
      color: 'var(--success-default)',
    },
    warning: {
      color: 'var(--warning-default)',
    },
    error: {
      color: 'var(--error-default)',
    },
  }

  const hideBorder = invert

  const invertColor = (hideBorder) => {
    if (hideBorder) {
      const style = {
        color: 'var(--primary-background)',
      }
      return style
    }
    return colors[type]
  }

  /**
   * use hideBorder to control backgroundColor and borderColor
   * when hideBorder value as true .It means should set default style Or it means should
   * set invert style.
   * 
   */
  const tagStyle = {
    ...invertColor(hideBorder),
    bgColor: hideBorder ? colors[type].color : 'var(--primary-background)',
    borderColor: hideBorder ? 'transparent' : colors[type].color,
  }

  return tagStyle
}

export default createComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default',
      validator: validator.enums(normalTypes),
    },
    useInvert: Boolean,
  },
  setup(props, { attrs, slots, emit }) {
    const setTagStyle = computed(() => {
      const { type, useInvert } = props
      const { color, bgColor, borderColor } = queryColors(type, useInvert)

      const style = {
        borderColor,
        color: color,
        backgroundColor: bgColor,
      }
      return style
    })

    return () => (
      <div class="fect-tag" style={setTagStyle.value}>
        {props.text}
      </div>
    )
  },
})
