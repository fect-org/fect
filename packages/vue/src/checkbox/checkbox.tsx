import { computed, watch, defineComponent, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import CheckIcon from './checkbox-icon'
import { createName, createBem, pickContextProps } from '../utils'
import { useCheckboxContext } from '../checkbox-group/checkbox-context'
import { checkboxProps } from '../checkbox-group/props'
import type { CheckboxEvent } from '../checkbox-group/interface'

import './index.less'

const name = createName('Checkbox')
const bem = createBem('fect-checkbox')

export default defineComponent({
  name,
  props: checkboxProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [selfChecked, setSelfChecked] = useState<boolean>(props.modelValue)
    const { context } = useCheckboxContext()

    const selfDisabled = computed(() => {
      const { disabled } = props
      const { disabled: state } = pickContextProps({ disabled }, context)
      return state
    })

    const setChekcboxClass = computed(() => {
      const { size, disabled } = props
      const behavior = pickContextProps({ size, disabled }, context)
      return bem(null, behavior)
    })

    /**
     * when checkbox use in checkbox-group, we set
     * parent label val will trigger this evt.
     * so we don't need setSelfChecked at once.
     */
    const setCurrentState = () => {
      if (!context) return
      const parent = context.parentValue.value
      const checked = parent.some((v) => v === props.label)
      setSelfChecked(checked)
    }

    watchEffect(setCurrentState)

    const handleChange = (e: Event) => {
      if (selfDisabled.value) return
      const checkboxEvent: CheckboxEvent = {
        target: {},
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e
      }

      if (context) {
        context.updateCheckboxGroupValue(props.label)
        context.updateCheckboxGroupEvent(checkboxEvent)
        return
      }
      setSelfChecked((pre) => !pre)
      emit('change', {
        ...checkboxEvent,
        target: { checked: selfChecked.value }
      })
    }

    watch(selfChecked, (cur) => emit('update:modelValue', cur))

    return () => (
      <label class={setChekcboxClass.value}>
        <CheckIcon class={`${selfDisabled.value ? 'disabled' : ''}`} checked={selfChecked.value} />
        <input
          type="checkbox"
          disabled={selfDisabled.value}
          checked={selfChecked.value}
          onChange={handleChange}
        ></input>
        <span class={bem('inner')}>{slots.default?.()}</span>
      </label>
    )
  }
})
