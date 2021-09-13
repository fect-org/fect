import { computed, watchEffect, PropType, watch, defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { useState, createName } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import { CustomCSSProperties } from '../utils/base'
import {
  READONLY_CHECKBOX_KEY,
  CheckboxGroupProvide,
  CheckboxEvent,
} from '../checkbox-group/checkbox-group'
import CheckIcon from './checkbox-icon'
import './index.less'

const name = createName('Checkbox')

const queryCheckboxSize = (size: NormalSizes) => {
  const sizes: Record<NormalSizes, string> = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return sizes[size]
}

export default defineComponent({
  name,
  props: {
    disabled: Boolean,
    modelValue: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [selfChecked, setSelfChecked] = useState<boolean>(props.modelValue)
    const { context } = useProvider<CheckboxGroupProvide>(READONLY_CHECKBOX_KEY)

    const selfSize = computed(() => {
      if (context) return context.props.size
      return props.size
    })

    const selfDisabled = computed(() => {
      if (context) return context.props.disabled
      return props.disabled
    })

    const setCurrentState = () => {
      const parent = context!.parentValue.value
      const checked = parent.some((v) => v === props.label)
      setSelfChecked(checked)
    }

    if (context) {
      watchEffect(setCurrentState)
    }

    const handleChange = (e: Event) => {
      if (selfDisabled.value) return
      setSelfChecked(!selfChecked.value)
      const checkboxEvent: CheckboxEvent = {
        target: {},
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }

      if (context) {
        context.updateParentValue(props.label, selfChecked.value)
        context.parentChangeHandler(checkboxEvent)
        return
      }

      emit('change', {
        ...checkboxEvent,
        target: { checked: selfChecked.value },
      })
    }

    watch(selfChecked, (cur) => emit('update:modelValue', cur))

    const setCheckBoxBaseSize = computed(() => {
      const size = queryCheckboxSize(selfSize.value)
      const style: CustomCSSProperties = {}
      style['--checkboxSize'] = size
      return style
    })

    return () => (
      <label
        class={`fect-checkbox ${selfDisabled.value ? 'disabled' : ''}`}
        style={setCheckBoxBaseSize.value}
      >
        <CheckIcon
          class={`${selfDisabled.value ? 'disabled' : ''}`}
          checked={selfChecked.value}
        />
        <input
          type="checkbox"
          disabled={selfDisabled.value}
          checked={selfChecked.value}
          onChange={handleChange}
        ></input>
        <span class="fect-checkbox__inner">{slots.default?.()}</span>
      </label>
    )
  },
})
