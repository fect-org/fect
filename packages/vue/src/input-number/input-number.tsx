import { computed, defineComponent } from 'vue'
import { createBem, createName } from '../utils'
import Input from '../input'
import { useFormStateContext, pickFormStateProps } from '../form/form-context'
import { inputNumberProps } from './props'
import PlusIcon from './plus-icon'
import MinusIcon from './minus-icon'

import './index.less'

const bem = createBem('fect-input-number')
const name = createName('InputNumber')

export default defineComponent({
  name,
  props: inputNumberProps,
  setup(props) {
    const formState = useFormStateContext()

    const getInputNumberState = computed(() => {
      const { size, disabled } = pickFormStateProps(
        { size: props.size, disabled: props.disabled },
        null,
        formState?.behavior.value
      )
      return { size, disabled }
    })

    return () => (
      <div class={bem(null, getInputNumberState.value)}>
        {/* <MinusIcon /> */}
        <Input type="number" prefix={() => <MinusIcon />} suffix={() => <PlusIcon />} {...props} />
        {/* <PlusIcon /> */}
      </div>
    )
  }
})
