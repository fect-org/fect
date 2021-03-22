import { toRefs } from 'vue'
import { createNameSpace, validator, theme } from '../utils'

const { normalSizes, normalTypes } = theme

const [createComponent] = createNameSpace('Loading')
import './loading.less'

export default createComponent({
  props: {
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
    type: {
      type: String,
      validator: validator.enums(normalTypes),
      default: 'default',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    const { size, type, color } = toRefs(props)
    const safeColor = !!color?.value
    return () => (
      <div
        {...attrs}
        className={`fect-loading-container ${attrs.class ? attrs.class : ''}`}
      >
        <span className={'loading'}>
          {new Array(3).fill(0).map((item, i) => (
            <i
              className={`${size.value} ${type.value}`}
              style={{ backgroundColor: `${safeColor && color.value}` }}
              key={item + i}
            ></i>
          ))}
        </span>
      </div>
    )
  },
})
