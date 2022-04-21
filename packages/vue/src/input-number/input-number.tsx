import { computed, defineComponent, watch } from 'vue'
import { createBem, createName } from '../utils'
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

    const minusHandler = () => setCurrentValue((pre) => --pre)

    const plusHandler = () => setCurrentValue((pre) => ++pre)

    watch(currentValue, (cur) => emit('update:modelValue', cur))

    return () => (
      <div class={bem(null, getInputNumberState.value)}>
        <Input
          type="number"
          prefix={() => <MinusIcon onClick={minusHandler} />}
          suffix={() => <PlusIcon onClick={plusHandler} />}
          {...props}
        />
      </div>
    )
  }
})
