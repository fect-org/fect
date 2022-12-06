import { defineComponent, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, assign, createBem } from '../utils'
import { radioGroupProps } from './props'
import { createRadioContext } from './radio-context'
import type { RadioEvent, Parent } from './interface'

import './index.less'

const name = createName('RadioGroup')
const bem = createBem('fect-radio')

export default defineComponent({
  name,
  props: radioGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [parentValue, setParentValue] = useState<Parent>(props.modelValue)
    const { provider } = createRadioContext()

    const updateRadioGroupValue = (val: Parent) => {
      setParentValue(val)
      emit('update:modelValue', parentValue)
    }

    const updateRadioGroupChangeEvent = (nextEvt: RadioEvent) => {
      nextEvt = assign(nextEvt, {
        target: {
          checkedVal: parentValue.value
        }
      })
      emit('change', nextEvt)
    }

    watch(
      () => props.modelValue,
      (cur) => {
        if (cur) setParentValue(cur)
      }
    )

    provider({ props, parentValue, updateRadioGroupValue, updateRadioGroupChangeEvent })
    return () => <div class={bem('group', { useRow: props.useRow })}>{slots.default?.()}</div>
  }
})
