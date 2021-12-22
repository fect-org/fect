import { defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { radioGroupProps } from './props'
import { createRadioContext } from './radio-context'
import type { RadioEvent, Parent } from './interface'

import './index.less'

const name = createName('RadioGroup')

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

    const updateRadioGroupChangeEvent = (nextEvt: RadioEvent) => emit('change', nextEvt)

    provider({ props, parentValue, updateRadioGroupValue, updateRadioGroupChangeEvent })

    return () => <div class={`fect-radio__group ${props.useRow ? 'useRow' : ''}`}>{slots.default?.()}</div>
  }
})
