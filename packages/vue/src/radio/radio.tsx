import { defineComponent, computed, watch, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { radioProps } from '../radio-group/props'
import { useRadioContext } from '../radio-group/radio-context'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'
import type { RadioEvent } from '../radio-group/interface'
import './index.less'

const name = createName('Radio')
const bem = createBem('fect-radio')

export default defineComponent({
  name,
  props: radioProps,
  emits: ['change', 'update:checked'],
  setup(props, { emit, slots }) {
    const [selfChecked, setSelfChecked] = useState<boolean>()

    const formState = useFormStateContext()

    const { context } = useRadioContext()

    const getRadioState = computed(() => {
      const { size, disabled } = pickFormStateProps(
        { size: props.size, disabled: props.disabled },
        context,
        formState?.behavior.value
      )
      return { size, disabled }
    })

    const setCurrentState = () => {
      if (!context) {
        setSelfChecked(props.checked)
        return
      }
      const parent = context.parentValue.value
      const checked = parent === props.value
      setSelfChecked(checked)
    }

    watchEffect(setCurrentState)

    const changeHandler = (e: Event) => {
      if (getRadioState.value.disabled) return
      const radioEvent: RadioEvent = {
        target: {},
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e
      }
      if (context) {
        context.updateRadioGroupChangeEvent(radioEvent)
        context.updateRadioGroupValue(props.value!)
        return
      }
      setSelfChecked((pre) => !pre)
      emit('change', {
        ...radioEvent,
        target: { checked: selfChecked.value }
      })
    }

    watch(selfChecked, (cur) => {
      if (formState) formState.validate('change')
      emit('update:checked', cur)
    })

    return () => (
      <div class={bem(null, getRadioState.value)}>
        <label>
          <input
            type="radio"
            checked={selfChecked.value}
            onChange={changeHandler}
            disabled={getRadioState.value.disabled}
          ></input>
          <span class={bem('name')}>
            <span class={bem('point', { disabled: getRadioState.value.disabled, active: selfChecked.value })} />
            {slots.default?.()}
          </span>
        </label>
      </div>
    )
  }
})
