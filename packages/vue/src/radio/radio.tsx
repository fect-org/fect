import { defineComponent, computed, watch, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
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

    const selfSize = computed(() => {
      if (context) return context.props.size
      return props.size
    })

    const selfValue = computed(() => {
      if (context) return context.props.modelValue
      return props.value
    })

    const selfDisabled = computed(() => {
      if (context) return context.props.disabled
      return props.disabled
    })

    watchEffect(() => context && setSelfChecked(context.parentValue.value === props.value))

    /**
     * Extract logic and put it into the group for processing
     */

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
      setSelfChecked(!selfChecked.value)
      emit('change', {
        ...radioEvent,
        target: { checked: selfChecked.value }
      })
    }

    watch(selfChecked, (cur) => emit('update:checked', cur))

    return () => (
      <div class={`fect-radio ${bem(null, selfSize.value)}`}>
        <label class={`${selfDisabled.value ? 'disabled' : ''}`}>
          <input
            type="radio"
            value={selfValue.value}
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
