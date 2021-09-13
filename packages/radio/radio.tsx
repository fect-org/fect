import { computed, watchEffect, PropType, watch, defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName, useState } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import {
  RadioGroupProvide,
  READNONLY_RADIO_KEY,
  RadioEvent,
} from '../radio-group/radio-group'
import './index.less'
import { CustomCSSProperties } from '../utils/base'

const name = createName('Radio')

const queryRadioSize = (radioSize: NormalSizes) => {
  const size: Record<NormalSizes, string> = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return size[radioSize]
}

export default defineComponent({
  name,
  props: {
    checked: Boolean,
    disabled: Boolean,
    value: { type: [String, Number], required: true },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
  },
  emits: ['change', 'update:checked'],
  setup(props, { emit, slots }) {
    const [selfChecked, setSelfChecked] = useState<boolean>(props.checked)

    const { context } = useProvider<RadioGroupProvide>(READNONLY_RADIO_KEY)

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

    if (context) {
      watchEffect(() => {
        setSelfChecked(context.parentValue.value === props.value)
      })
    }

    /**
     * Extract logic and put it into the group for processing
     */

    const changeHandler = (e: Event) => {
      if (selfDisabled.value) return
      const radioEvent: RadioEvent = {
        target: {},
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      if (context) {
        context.updateState({
          ...radioEvent,
          target: { checkedVal: props.value, checked: !selfChecked.value },
        })
        context.setCurrentValue(props.value)
        return
      }
      setSelfChecked(!selfChecked.value)
      emit('change', {
        ...radioEvent,
        target: { checked: selfChecked.value },
      })
    }

    const setRadioSize = computed(() => {
      const size = queryRadioSize(selfSize.value)
      const style: CustomCSSProperties = {}
      style['--radioSize'] = size
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
              class={`fect-radio__point ${
                selfDisabled.value ? 'disabled' : ''
              } ${selfChecked.value ? 'active' : ''}`}
            />
            {slots.default?.()}
          </span>
        </label>
      </div>
    )
  },
})
