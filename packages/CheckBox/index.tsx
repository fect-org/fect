import { computed, ref, watchEffect, PropType } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import { CustomCSSProperties } from '../utils/base'
import {
  READONLY_CHECKBOX_KEY,
  CheckboxGroupProvide,
  CheckboxEvent,
} from '../CheckboxGroup'
import CheckIcon from './checkbox-icon'
import './checkbox.less'

const [createComponent] = createNameSpace('Checkbox')

const queryCheckboxSize = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: string } = {
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
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    label: {
      type: [String],
      default: '',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const isChecked = ref<boolean>(props.modelValue)
    const selfSize = ref<NormalSizes>(props.size)
    const isDisabled = ref<boolean>(props.disabled)
    const { context } = useProvider<CheckboxGroupProvide>(READONLY_CHECKBOX_KEY)

    const setCurrentState = () => {
      const { modelValue } = context!.props
      const value = modelValue.slice()
      isChecked.value = Boolean(value.find((v) => v === props.label))
    }

    const setCurrentStyle = () => {
      isDisabled.value = context!.props.disabled
      selfSize.value = context!.props.size
    }

    const setParentValue = (event: CheckboxEvent) => {
      const { label } = props
      const { modelValue } = context!.props
      const { updateParentValue, handlerParentChange } = context!
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
      handlerParentChange({ ...event, target: { value } })
    }

    const handleChange = (e: Event) => {
      isChecked.value = !isChecked.value
      const CheckboxEvent: CheckboxEvent = {
        target: {
          checked: isChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      if (context) {
        setParentValue(CheckboxEvent)
      }
      if (!context) {
        emit('update:modelValue', isChecked.value)
        emit('change', CheckboxEvent)
      }
    }

    if (context) {
      watchEffect(() => {
        setCurrentState()
        setCurrentStyle()
      })
    }

    const setCheckBoxBaseSize = computed(() => {
      const _size = queryCheckboxSize(selfSize.value)
      const style: CustomCSSProperties = {}
      style['--checkboxSize'] = _size
      return style
    })

    return () => (
      <label
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
          onChange={handleChange}
        ></input>
        <span class="fect-text_inner">{slots.default?.()}</span>
      </label>
    )
  },
})
