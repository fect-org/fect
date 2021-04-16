import { computed, ref, toRefs, watchEffect } from 'vue'
import { validator, theme, createNameSpace } from '../utils'
const { buttonTypes, normalSizes } = theme
const [createComponent] = createNameSpace('Button')

import ButtonDrip from './button.drip'
import ButtonLoading from './button.loading'
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
    auto: Boolean,
  },
  emits: ['click'],
  setup(props, { attrs, slots, emit }) {
    const { size, type, loading, shadow, disabled, auto } = toRefs(props)
    const buttonRef = ref(null)
    const drapShow = ref(false) // control drap component display
    const drapX = ref(0)
    const drapY = ref(0)

    const calcClass = computed(() => {
      let str = ''
      loading.value && (str += ' loading')
      type.value && (str += ` ${type.value}`)
      size.value && (str += ` ${size.value}`)
      shadow.value && (str += ' shadow')
      disabled.value && (str += ' disabled')
      auto.value && (str += ' auto')
      return str.trim()
    })

    const clickHandler = (e) => {
      // hide drip when button in shadow status
      if (disabled.value || loading.value) return
      const showDrip = !shadow.value
      if (showDrip) {
        const rect = buttonRef.value.getBoundingClientRect()
        drapShow.value = true
        drapX.value = e.clientX - rect.left
        drapY.value = e.clientY - rect.top
      }
      emit('click', e)
    }

    const dripCompleteHandler = () => {
      setTimeout(() => {
        drapShow.value = false
        drapX.value = 0
        drapY.value = 0
      }, 500)
    }

    return () => (
      <>
        <button
          {...attrs}
          disabled={disabled.value}
          className={`fect-btn ${calcClass.value} ${
            attrs.class ? attrs.class : ''
          }`}
          ref={buttonRef}
          onClick={clickHandler}
        >
          {loading.value && <ButtonLoading color={type.value} />}
          {drapShow.value && (
            <ButtonDrip
              x={drapX.value}
              y={drapY.value}
              onCompleted={dripCompleteHandler}
            />
          )}
          {slots.default?.()}
        </button>
      </>
    )
  },
})
