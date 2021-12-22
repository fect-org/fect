import { watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { createCheckboxContext } from './checkbox-context'
import { checkboxGroupProps } from './props'
import type { CheckboxEvent } from './interface'

import './index.less'

const name = createName('CheckboxGroup')

export default defineComponent({
  name,
  props: checkboxGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [parentValue, setParentValue] = useState<string[]>(props.modelValue)

    const { provider } = createCheckboxContext()

    const updateCheckboxGroupValue = (val: string, checked: boolean) => {
      const value = parentValue.value.slice()
      const index = value.indexOf(val)
      const exist = index !== -1
      if (checked) {
        !exist && value.push(val)
      }
      if (!checked) {
        exist && value.splice(index, 1)
      }
      setParentValue(value)
    }
    const updateCheckboxGroupEvent = (e: CheckboxEvent) => {
      const event = {
        ...e,
        target: { value: parentValue }
      }
      emit('change', event)
    }

    provider({ props, updateCheckboxGroupValue, parentValue, updateCheckboxGroupEvent })

    watch(parentValue, (cur) => emit('update:modelValue', cur))

    return () => <div class={`fect-checkbox__group ${props.useRow ? 'useRow' : ''}`}>{slots.default?.()}</div>
  }
})
