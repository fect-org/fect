import { defineComponent, computed, watch, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, NormalSizes, hasEmpty } from '../utils'
import { radioProps } from '../radio-group/props'
import { useRadioContext } from '../radio-group/radio-context'
import type { RadioEvent } from '../radio-group/interface'
import './index.less'
import { CustomCSSProperties } from '../utils'

const name = createName('Radio')

const queryRadioSize = (radioSize: NormalSizes) => {
  const size: Record<NormalSizes, string> = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px'
  }
  return size[radioSize]
}

export default defineComponent({
  name,
  props: radioProps,
  emits: ['change', 'update:checked'],
  setup(props, { emit, slots }) {
    if (process.env.NODE_ENV !== 'production' && hasEmpty(props.value)) {
      console.error('[Fect] value must be set in <Radio>.')
      return
    }

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

    const setRadioSize = computed(() => {
      const size = queryRadioSize(selfSize.value)
      const style: CustomCSSProperties = {
        '--radioSize': size
      }
      return style
    })

    watch(selfChecked, (cur) => emit('update:checked', cur))

    return () => (
      <div class="fect-radio" style={setRadioSize.value}>
        <label class={`${selfDisabled.value ? 'disabled' : ''}`}>
          <input
            type="radio"
            value={selfValue.value}
            checked={selfChecked.value}
            onChange={changeHandler}
            disabled={selfDisabled.value}
          ></input>
          <span class={'fect-radio__name'}>
            <span
              class={`fect-radio__point ${selfDisabled.value ? 'disabled' : ''} ${selfChecked.value ? 'active' : ''}`}
            />
            {slots.default?.()}
          </span>
        </label>
      </div>
    )
  }
})
