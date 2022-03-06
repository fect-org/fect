import { computed, PropType, defineComponent, watchEffect } from 'vue'
import { createName, UnknowProp, hasEmpty, createBem } from '../utils'
import { useState } from '@fect-ui/vue-hooks'
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
      const { disabled } = props
      if (disabled) return
      changeHandler(e)
    }

    const setSwitchClass = computed(() => {
      const { size, disabled } = props
      const checked = isChecked()
      return bem(null, { size, disabled, checked })
    })

    return () => (
      <label class={setSwitchClass.value} onClick={switchHandler}>
        <input
          class={bem('checkbox')}
          type="checkBox"
          checked={isChecked()}
          disabled={props.disabled}
          onChange={changeHandler}
        />
        <div class={bem('slider')}>
          <span class={bem('inner', { checked: isChecked(), disabled: props.disabled })}></span>
        </div>
      </label>
    )
  }
})
