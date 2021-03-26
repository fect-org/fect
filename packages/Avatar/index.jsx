import { computed, toRefs } from 'vue'
import { validator, theme, createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Avatar')
const { normalSizes } = theme

import './avatar.less'

export default createComponent({
  props: {
    stacked: Boolean,
    isSquare: Boolean,
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
    text: {
      type: String,
      default: '',
    },
    src: String,
    className: String,
  },
  setup(props, { attrs }) {
    const { stacked, isSquare, size, text, src, className } = toRefs(props)
    const showText = !(src && src.value)

    // when text has value to take the best range
    const safeText = (text) =>
      String(text).length <= 4 ? text : text.slice(0, 3)

    //calculate outer Container className
    const calcClass = computed(() => (className ? className.value : ''))

    // claulate avatar style
    const calcAttrs = computed(() => {
      let str = ''
      stacked.value && (str += ' stacked')
      isSquare.value && (str += ' isSquare')
      size.value && (str += ` ${size.value}`)
      return str.trim()
    })

    return () => (
      <>
        <div
          className={`fect-avatar ${calcAttrs.value} ${calcClass.value}`}
          style={attrs.style ? attrs.style : ''}
        >
          {!showText && <img src={src.value} draggable="false" {...attrs} />}
          {showText && (
            <span
              className={`fect-avatar-text ${attrs.class ? attrs.class : ''}`}
              {...attrs}
            >
              {/* {text.value} */}
              {safeText(text.value)}
            </span>
          )}
        </div>
      </>
    )
  },
})
