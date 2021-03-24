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

    return () => (
      <>
        <div
          {...attrs}
          className={`fect-dot-wrapper ${classAttr ? attrs.class : ''}`}
        >
          <span className={`fect-dot ${type.value}`}></span>
          <span className={'fect-dot-ctx'}>{slots.default?.()}</span>
        </div>
      </>
    )
  },
})
