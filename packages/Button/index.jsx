import { computed, toRefs } from 'vue'
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
      default: 'default',
    },
    size: {
      type: String,
      validator: validator.enums(normalSizes),
      default: 'medium',
    },
    disabled: Boolean,
    shadow: Boolean,
    loading: Boolean,
  },
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    const { size, type, loading, shadow, disabled } = toRefs(props)
    const clacClass = computed(() => {
      let str = ''
      loading.value && (str += ' loading')
      type.value && (str += ` ${type.value}`)
      size.value && (str += ` ${size.value}`)
      shadow.value && (str += ' shadow')
      disabled.value && (str += ' disabled')
      return str.trim()
    })
    const clickHandler = (e) => emit('click', e)
    return () => (
      <>
        <button className={`fay-btn ${clacClass.value}`} onClick={clickHandler}>
          {slots && slots.default()}
        </button>
      </>
    )
  },
})
