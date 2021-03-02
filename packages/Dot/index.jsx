import { toRefs } from 'vue'
import { createNameSpace, validator, theme } from '../utils'
const { normalTypes } = theme
const [createComponent] = createNameSpace('Dot')
import './dot.less'

export default createComponent({
  props: {
    type: {
      type: String,
      validator: validator.enums(normalTypes),
      default: 'default',
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { type } = toRefs(props)
    const classAttr = !!attrs?.class
    console.log(classAttr)
    return () => (
      <>
        <div
          {...attrs}
          className={`fay-dot-wrapper ${classAttr ? attrs.class : ''}`}
        >
          <span className={`fay-dot ${type.value}`}></span>
          <span className={'fay-dot-ctx'}>{slots && slots.default()}</span>
        </div>
      </>
    )
  },
})
