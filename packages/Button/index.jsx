import { toRefs } from 'vue'
import validator from '../utils/validator'
import theme from '../utils/theme'
import { createNameSpace } from '../utils'
const { buttonTypes, normalSizes } = theme
const [createComponent] = createNameSpace('Button')

import './button.less'

export default createComponent({
  props: {
    type: {
      type: String,
      validator: validator.enums(buttonTypes),
    },
    size: {
      type: String,
      validator: validator.enums(normalSizes),
    },
    disabled: Boolean,
    shadow: Boolean,
    loading: Boolean,
  },
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    const { size, type } = toRefs(props)
    const clickHandler = (e) => emit('click', e)
    return () => (
      <>
        <div className={'fay-btn'} onClick={clickHandler}>
          {slots && slots.default()}
        </div>
      </>
    )
  },
})
