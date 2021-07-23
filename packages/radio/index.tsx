import { computed, ref, watchEffect, PropType } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import { NormalSizes } from '../utils/theme/propTypes'
import {
  RadioGroupProvide,
  READNONLY_RADIO_GROUP_KEY,
  RadioEvent,
} from '../radio-group'
import './index.less'
import { CustomCSSProperties } from '../utils/base'

const [createComponent] = createNameSpace('Radio')

const queryRadioSize = (radioSize: NormalSizes) => {
  const size: { [key in NormalSizes]: string } = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return size[radioSize]
}

export default createComponent({
  props: {
    checked: Boolean,
    disabled: Boolean,
    value: { type: [String, Number], required: true },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
  },
  emits: ['change'],
  setup(props, { emit, slots }) {
    const radioValue = ref<string | number>(props.value)
    const radioSize = ref<NormalSizes>(props.size)
    const isDisabled = ref<boolean>(props.disabled)
    const selfChecked = ref<boolean>(!!props.checked)

    const { context } = useProvider<RadioGroupProvide>(
      READNONLY_RADIO_GROUP_KEY,
    )

    const changeStatus = () => {
      const { disabled, size, initialValue } = context!.props
      isDisabled.value = disabled
      radioSize.value = size
      /** refactor */
      const parentValue = initialValue || null
      if (context?.groupValue.value) {
        selfChecked.value = context.groupValue.value === props.value
      }
      if (!context?.groupValue.value) {
        if (parentValue) selfChecked.value = parentValue === props.value
      }
    }

    /**
     * when component init,it will execute once.
     * watchEffect will executed auto when the dependence is changed
     */

    if (context) {
      watchEffect(changeStatus)
    }
    /**
     * without radioGroup
     */
    if (!context) {
      watchEffect(() => {
        selfChecked.value = props.checked ? true : false
      })
    }

    const handleChange = (e: Event) => {
      if (isDisabled.value) return
      selfChecked.value = !selfChecked.value
      const radioEvent: RadioEvent = {
        target: {
          checked: selfChecked.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      if (context) {
        context.groupValue.value = props.value
        context.updateState
          && context.updateState({
            ...radioEvent,
            target: { checkedVal: radioValue.value },
          })
      }
      if (!context) {
        emit('change', radioEvent)
      }
    }
    const setRadioSize = computed(() => {
      const size = queryRadioSize(radioSize.value)
      const style: CustomCSSProperties = {}
      style['--radioSize'] = size
      return style
    })

    return () => (
      <div class="fect-radio" style={setRadioSize.value}>
        <label class={`${isDisabled.value ? 'disabled' : ''}`}>
          <input
            type="radio"
            value={radioValue.value}
            checked={selfChecked.value}
            onChange={handleChange}
            disabled={isDisabled.value}
          ></input>
          <span class={'fect-radio__name'}>
            <span
              class={`fect-radio__point ${isDisabled.value ? 'disabled' : ''} ${
                selfChecked.value ? 'active' : ''
              }`}
            />
            {slots.default?.()}
          </span>
        </label>
      </div>
    )
  },
})
