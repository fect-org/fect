import { computed, PropType, defineComponent, watchEffect } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, UnknowProp, hasEmpty, createBem } from '../utils'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'
import type { NormalSizes } from '../utils'
import './index.less'

const name = createName('Switch')
const bem = createBem('fect-switch')

interface SwitchEventTarget {
  checked: unknown // may be any value
}

export interface SwitchEvent {
  target: SwitchEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

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
    const [value, setValue] = useState<any>(null)

    const formState = useFormStateContext()

    const getSwitchState = computed(() => {
      const { size, disabled } = pickFormStateProps(
        { size: props.size, disabled: props.disabled },
        null,
        formState?.behavior.value
      )

      return { size, disabled }
    })

    const isChecked = () => value.value === props.checkedValue

    watchEffect(() => {
      setValue(props.modelValue || props.value)
    })

    const changeHandler = (e: Event) => {
      const reverse = isChecked() ? props.inactiveValue : props.checkedValue
      emit('update:modelValue', reverse)
      const selfEvent: SwitchEvent = {
        target: {
          checked: reverse
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e
      }
      emit('change', selfEvent)
      if (hasEmpty(props.value)) setValue(reverse)
    }

    const switchHandler = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      const { disabled } = getSwitchState.value
      if (disabled) return
      changeHandler(e)
    }

    const setSwitchClass = computed(() => {
      const checked = isChecked()
      return bem(null, { ...getSwitchState.value, checked })
    })

    return () => (
      <label class={setSwitchClass.value} onClick={switchHandler}>
        <input
          class={bem('checkbox')}
          type="checkBox"
          checked={isChecked()}
          disabled={getSwitchState.value.disabled}
          onChange={changeHandler}
        />
        <div class={bem('slider')}>
          <span class={bem('inner', { checked: isChecked(), disabled: getSwitchState.value.disabled })}></span>
        </div>
      </label>
    )
  }
})
