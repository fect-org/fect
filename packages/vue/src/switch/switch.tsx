import { computed, PropType, defineComponent, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, UnknowProp, createBem, omit } from '../utils'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'
import type { NormalSizes } from '../utils'
import type { SwitchEvent } from './interface'
import './index.less'

const name = createName('Switch')
const bem = createBem('fect-switch')

export default defineComponent({
  name,
  props: {
    modelValue: UnknowProp,
    value: UnknowProp,
    checkedValue: {
      type: UnknowProp,
      default: true
    },
    inactiveValue: {
      type: UnknowProp,
      default: false
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium'
    },
    disabled: Boolean
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const [currentValue, setCurrentValue] = useState<unknown>(null)

    const formState = useFormStateContext()

    const getSwitchState = computed(() => {
      const { size, disabled } = pickFormStateProps(
        { size: props.size, disabled: props.disabled },
        null,
        formState?.behavior.value
      )

      return { size, disabled, checked: isChecked() }
    })

    const isChecked = () => currentValue.value === props.checkedValue

    watchEffect(() => {
      if (props.value) {
        setCurrentValue(props.value)
      }
    })

    const updateSwitchValue = (val: unknown) => {
      emit('update:modelValue', val)
      setCurrentValue(val)
    }

    const changeHandler = (e: Event) => {
      const reverse = isChecked() ? props.inactiveValue : props.checkedValue
      const selfEvent: SwitchEvent = {
        target: {
          checked: reverse
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e
      }
      updateSwitchValue(reverse)
      emit('change', selfEvent)
      if (formState) formState.validate('change')
    }

    const switchHandler = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      const { disabled } = getSwitchState.value
      if (disabled) return
      changeHandler(e)
    }

    return () => (
      <label class={bem(null, getSwitchState.value)} onClick={switchHandler}>
        <input
          class={bem('checkbox')}
          type="checkbox"
          checked={isChecked()}
          disabled={getSwitchState.value.disabled}
          onChange={changeHandler}
        />
        <div class={bem('slider')}>
          <span class={bem('inner', omit(getSwitchState.value, ['size']))}></span>
        </div>
      </label>
    )
  }
})
