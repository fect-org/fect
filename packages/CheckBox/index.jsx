import { computed, ref, watchEffect } from 'vue'
import { createNameSpace, useProvider, theme, validator } from '../utils'
import CheckIcon from './check.icon'
const [createComponent] = createNameSpace('Checkbox')
import './checkBox.less'

const READONLY_CHECKBOX_KEY = 'checkboxKey'

const { normalSizes } = theme

const queryCheckboxSize = (size) => {
  const sizes = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return sizes[size]
}

export default createComponent({
  props: {
    disabled: Boolean,
    modelValue: {
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const isChecked = ref(props.modelValue)
    const selfSize = ref(props.size)
    const isDisabled = ref(props.disabled)
    const { ctx } = useProvider(READONLY_CHECKBOX_KEY)
    // const { setParentModelValue, handlerParentChange } = ctx
    const handlerChange = (e) => {
      isChecked.value = !isChecked.value
      emit('update:modelValue', isChecked.value)
      const CheckboxEvent = {
        target: {
          checked: isChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      emit('change', CheckboxEvent)
    }

    const setCurrentStyle = () => {
      isDisabled.value = ctx.props.disabled
      selfSize.value = ctx.props.size
    }
    if (ctx) {
      watchEffect(() => {
        setCurrentStyle()
      })
    }

    const setCheckBoxBaseSize = computed(() => {
      const _size = queryCheckboxSize(selfSize.value)
      const style = {}
      style['--checkboxSize'] = _size
      return style
    })

    return () => (
      <label
        {...attrs}
        class={`fect-checkbox ${isDisabled.value ? 'disabled' : ''}`}
        style={setCheckBoxBaseSize.value}
      >
        <CheckIcon
          class={`${isDisabled.value ? 'disabled' : ''}`}
          checked={isChecked.value}
        />
        <input
          type="checkbox"
          disabled={isDisabled.value}
          checked={isChecked.value}
          onChange={handlerChange}
        ></input>
        <span className="fect-text_inner">{slots.default?.()}</span>
      </label>
    )
  },
})
