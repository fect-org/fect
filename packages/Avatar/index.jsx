import { validator, theme, createNameSpace } from '../utils'
const [createComponent] = createNameSpace('Avatar')
const { normalSizes } = theme

import './avatar.less'

export default createComponent({
  props: {
    stacked: Boolean,
    isSquare: Boolean,
    size: validator.enums(normalSizes),
    text: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { stacked, isSquare, size, text, src } = props
    console.log(src.value)
    const showText = !src.value

    const safeText = (text) => (text.length <= 4 ? text : text.slice(0, 3))

    return () => (
      <>
        <div className={'fay-avatar'}>
          {!showText && <img src={src} draggable="false" {...attrs} />}
          {showText && (
            <span className={'fay-avatar-text'} {...attrs}>
              {safeText(text)}
            </span>
          )}
        </div>
      </>
    )
  },
})
