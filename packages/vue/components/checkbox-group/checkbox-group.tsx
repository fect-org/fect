import { watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { createCheckboxContext } from './checkbox-context'
import { checkboxGroupProps } from './props'
import type { CheckboxEvent } from './interface'

import './index.less'

const name = createName('CheckboxGroup')
const bem = createBem('fect-checkbox')

export default defineComponent({
  name,
  props: checkboxGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [parentValue, setParentValue] = useState<string[]>(props.modelValue)

    const { provider } = createCheckboxContext()

    const updateCheckboxGroupValue = (val: string) => {
      setParentValue((pre) => {
        const exist = pre.indexOf(val) !== -1
        if (exist) return pre.filter((item) => item !== val)
        return [...pre, val]
      })
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
    return () => <div class={bem('group', { useRow: props.useRow })}>{slots.default?.()}</div>
  }
})
