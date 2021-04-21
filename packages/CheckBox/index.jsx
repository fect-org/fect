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
    modelValue: Boolean,
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    label: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const isChecked = ref(props.modelValue)
    const selfSize = ref(props.size)
    const isDisabled = ref(props.disabled)
    const { ctx } = useProvider(READONLY_CHECKBOX_KEY)

    const setCurrentState = () => {
      const { modelValue } = ctx.props
      const value = modelValue.slice()
      isChecked.value = Boolean(value.find((v) => v === props.label))
    }

    const setParentValue = () => {
      const { label } = props
      const { modelValue } = ctx.props
      const { updateParentValue, handlerParentChange } = ctx
      const value = modelValue.slice()
      if (!isChecked.value) {
        const index = value.indexOf(label)
        value.splice(index, 1)
      } else {
        if (value.indexOf(label) === -1) {
          value.push(label)
        }
      }
      updateParentValue(value)
      handlerParentChange({ target: value })
    }

    const handlerChange = (e) => {
      isChecked.value = !isChecked.value
      const CheckboxEvent = {
        target: {
          checked: isChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      if (ctx) {
        setParentValue(CheckboxEvent)
      }
      if (!ctx) {
        emit('update:modelValue', isChecked.value)
        emit('change', CheckboxEvent)
      }
    }

    const setCurrentStyle = () => {
      isDisabled.value = ctx.props.disabled
      selfSize.value = ctx.props.size
    }
    if (ctx) {
      watchEffect(() => {
        setCurrentState()
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
          isChecked={isChecked.value}
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
