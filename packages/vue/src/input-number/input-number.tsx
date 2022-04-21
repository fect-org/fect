import { computed, defineComponent, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createBem, createName, numberParser, isUndefined, len, omit } from '../utils'
import Input from '../input'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'
import { inputNumberProps } from './props'
import IncreaseIcon from './increase-icon'
import DecreaseIcon from './decrease-icon'

import './index.less'

const bem = createBem('fect-input-number')
const name = createName('InputNumber')

export default defineComponent({
  name,
  props: inputNumberProps,
  emits: ['update:modelValue', 'change'],
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
    const fixPrecision = (value: number, condit = 1) => {
      const { step } = props
      const val = value + step * condit
      const precision = numberPrecision.value
      return numberParser(`${Math.round(val * 10 ** precision) / 10 ** precision}`)
    }

    const getPrecision = (val: number | undefined) => {
      if (isUndefined(val)) return 0
      const stringifyValue = val.toString()
      const dot = stringifyValue.indexOf('.') + 1
      if (!dot) return 0
      return len(stringifyValue) - dot
    }

    const numberPrecision = computed(() => {
      const { precision, step } = props
      const stepPrecision = getPrecision(step)
      if (!isUndefined(precision)) return precision
      return Math.max(getPrecision(currentValue.value), stepPrecision)
    })

    const enableDecrease = computed(() => fixPrecision(currentValue.value, -1) < props.min)

    const enableIncrease = computed(() => fixPrecision(currentValue.value) > props.max)

    const isEdge = (val: number) => {
      const { max, min, precision, strictly, step } = props
      if (strictly) val = Math.round(val / step) * step
      if (!isUndefined(precision)) val = fixPrecision(val, 0)
      if (val >= max) val = max
      if (val <= min) val = min
      return val
    }

    const updateCurrentValue = (val: number) => setCurrentValue(() => isEdge(val))

    const inputNumberChangeHandler = (evt: Event) => {
      const originalValue = Number((evt.target as HTMLInputElement).value)
      updateCurrentValue(fixPrecision(originalValue, 0))
    }

    const decreaseHandler = () => {
      if (getInputNumberState.value.disabled || enableDecrease.value) return
      const val = fixPrecision(currentValue.value, -1)
      updateCurrentValue(val)
    }

    const increaseHandler = () => {
      if (getInputNumberState.value.disabled || enableIncrease.value) return
      const val = fixPrecision(currentValue.value)
      updateCurrentValue(val)
    }

    watch(currentValue, (cur, pre) => {
      emit('update:modelValue', cur)
      emit('change', cur, pre)
      if (formState) formState.validate('change')
    })

    /**
     * Force update currentValue,while user modify bind value and we should
     * update internal value.
     */
    watch(
      () => props.modelValue,
      (cur) => cur && updateCurrentValue(fixPrecision(cur, 0))
    )

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
        <span
          class={bem('label', {
            prefix: true,
            disabled: enableDecrease.value
          })}
          onClick={decreaseHandler}
        >
          <DecreaseIcon />
        </span>
        <Input type="number" onChange={inputNumberChangeHandler} {...omit(props, ['onChange'])} />
        <span
          class={bem('label', {
            suffix: true,
            disabled: enableIncrease.value
          })}
          onClick={increaseHandler}
        >
          <IncreaseIcon />
        </span>
      </div>
    )
  }
})
