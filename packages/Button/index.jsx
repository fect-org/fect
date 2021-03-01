import { computed, toRefs } from 'vue'
import { validator, theme, createNameSpace } from '../utils'
const { buttonTypes, normalSizes } = theme
const [createComponent] = createNameSpace('Button')

import ButtonDrip from './button.drip'

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
    const clickHandler = (e) => {
      // hide drip when button in shadow status
      // const showDrip = !shadow.value
      emit('click', e)
    }
    return () => (
      <>
        <button
          disabled={disabled.value}
          className={`fay-btn ${clacClass.value}`}
          onClick={clickHandler}
          {...attrs}
        >
          {/* <ButtonDrip onCompleted={() => console.log('h')} />
          {loading.value && (
            <span className={'fay-loading-icon'}>
              <i></i>
              <i></i>
              <i></i>
            </span>
          )} */}
          {slots && slots.default()}
        </button>
      </>
    )
  },
})
