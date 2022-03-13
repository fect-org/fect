import { defineComponent, computed, watch, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem, pickContextProps } from '../utils'
import { radioProps } from '../radio-group/props'
import { useRadioContext } from '../radio-group/radio-context'
import type { RadioEvent } from '../radio-group/interface'
import './index.less'

const name = createName('Radio')
const bem = createBem('fect-radio')

export default defineComponent({
  name,
  props: radioProps,
  emits: ['change', 'update:checked'],
  setup(props, { emit, slots }) {
    const [selfChecked, setSelfChecked] = useState<boolean>(props.checked)

    const { context } = useRadioContext()

    const selfDisabled = computed(() => {
      const { disabled } = props
      const { disabled: state } = pickContextProps({ disabled }, context)
      return state
    })

    const setCurrentState = () => {
      if (!context) return
      const parent = context.parentValue.value
      const checked = parent === props.value
      setSelfChecked(checked)
    }

    watchEffect(setCurrentState)

    const changeHandler = (e: Event) => {
      if (selfDisabled.value) return
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

    watch(selfChecked, (cur) => emit('update:checked', cur))

    const setRadioClass = computed(() => {
      const { size, disabled } = props
      const behavoir = pickContextProps({ size, disabled }, context)
      return bem(null, behavoir)
    })

    return () => (
      <div class={setRadioClass.value}>
        <label>
          <input
            type="radio"
            checked={selfChecked.value}
            onChange={changeHandler}
            disabled={selfDisabled.value}
          ></input>
          <span class={bem('name')}>
            <span class={bem('point', { disabled: selfDisabled.value, active: selfChecked.value })} />
            {slots.default?.()}
          </span>
        </label>
      </div>
    )
  }
})
