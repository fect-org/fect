import { computed, watch, defineComponent, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import CheckIcon from './checkbox-icon'
import { createName, CustomCSSProperties, NormalSizes } from '../utils'
import { useCheckboxContext } from '../checkbox-group/checkbox-context'
import { checkboxProps } from '../checkbox-group/props'
import type { CheckboxEvent } from '../checkbox-group/interface'

import './index.less'

const name = createName('Checkbox')

const queryCheckboxSize = (size: NormalSizes) => {
  const sizes: Record<NormalSizes, string> = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px'
  }
  return sizes[size]
}

export default defineComponent({
  name,
  props: checkboxProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [selfChecked, setSelfChecked] = useState<boolean>(props.modelValue)
    const { context } = useCheckboxContext()

    const selfSize = computed(() => {
      if (context) return context.props.size
      return props.size
    })

    const selfDisabled = computed(() => {
      if (context) return context.props.disabled
      return props.disabled
    })

    const setCurrentState = () => {
      if (!context) return
      const parent = context.parentValue.value
      const checked = parent.some((v) => v === props.label)
      setSelfChecked(checked)
    }

    watchEffect(setCurrentState)

    const handleChange = (e: Event) => {
      if (selfDisabled.value) return
      setSelfChecked(!selfChecked.value)
      const checkboxEvent: CheckboxEvent = {
        target: {},
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e
      }

      if (context) {
        context.updateCheckboxGroupValue(props.label, selfChecked.value)
        context.updateCheckboxGroupEvent(checkboxEvent)
        return
      }

      emit('change', {
        ...checkboxEvent,
        target: { checked: selfChecked.value }
      })
    }

    watch(selfChecked, (cur) => emit('update:modelValue', cur))

    const setCheckBoxBaseSize = computed(() => {
      const size = queryCheckboxSize(selfSize.value)
      const style: CustomCSSProperties = {
        '--checkboxSize': size
      }
      return style
    })

    return () => (
      <label class={`fect-checkbox ${selfDisabled.value ? 'disabled' : ''}`} style={setCheckBoxBaseSize.value}>
        <CheckIcon class={`${selfDisabled.value ? 'disabled' : ''}`} checked={selfChecked.value} />
        <input
          type="checkbox"
          disabled={selfDisabled.value}
          checked={selfChecked.value}
          onChange={handleChange}
        ></input>
        <span class="fect-checkbox__inner">{slots.default?.()}</span>
      </label>
    )
  }
})
