import { computed, defineComponent, watch } from 'vue'
import { createBem, createName, isNumber } from '../utils'
import Input from '../input'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'
import { inputNumberProps } from './props'
import PlusIcon from './plus-icon'
import MinusIcon from './minus-icon'

import './index.less'
import { useState } from '@fect-ui/vue-hooks'

const bem = createBem('fect-input-number')
const name = createName('InputNumber')

export default defineComponent({
  name,
  props: inputNumberProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const [currentValue, setCurrentValue] = useState<number>(props.modelValue)
    const formState = useFormStateContext()
    const getInputNumberState = computed(() => {
      const { size, disabled } = pickFormStateProps(
        { size: props.size, disabled: props.disabled },
        null,
        formState?.behavior.value
      )
      return { size, disabled }
    })

    const isEdge = (val: number) => {
      const { max, min } = props
      if (val >= max) return max
      if (val <= min) return min
    }

    const updateCurrentValue = (val: number) => {
      const v = isEdge(val)
      if (v) return setCurrentValue(v)
      return setCurrentValue(val)
    }

    const inputNumberChangeHandler = (evt: Event) => {
      updateCurrentValue(Number((evt.target as HTMLInputElement).value))
    }

    const minusHandler = () => updateCurrentValue(currentValue.value - 1)

    const plusHandler = () => updateCurrentValue(currentValue.value + 1)

    watch(currentValue, (cur) => emit('update:modelValue', cur))

    /**
     * We don't plan to expaned the label evt of the original input component
     * Because the original component prefix & suffix only render text label
     * when we enable pass a function render it will cause input component
     * loose single responsibility.
     * After version:1.5.0-rc.0
     * Author: Kanno
     */

    return () => (
      <div class={bem(null, getInputNumberState.value)}>
        <span class={bem('label', 'prefix')} onClick={minusHandler}>
          <MinusIcon />
        </span>
        <Input type="number" onChange={inputNumberChangeHandler} {...props} />
        <span class={bem('label', 'suffix')} onClick={plusHandler}>
          <PlusIcon />
        </span>
      </div>
    )
  }
})
