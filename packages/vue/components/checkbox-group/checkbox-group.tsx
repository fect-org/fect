import { PropType, watch, defineComponent } from 'vue'
import { createProvider, useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import type { NormalSizes } from '../utils'
import { READONLY_CHECKBOX_KEY } from './type'
import type { CheckboxEvent } from './type'

import './index.less'

const name = createName('CheckboxGroup')

export default defineComponent({
  name,
  props: {
    disabled: Boolean,
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
    useRow: Boolean,
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [parentValue, setParentValue] = useState<string[]>(props.modelValue)

    const { provider } = createProvider(READONLY_CHECKBOX_KEY)

    const updateParentValue = (val: string, checked: boolean) => {
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
    const parentChangeHandler = (e: CheckboxEvent) => {
      const event = {
        ...e,
        target: { value: parentValue },
      }
      emit('change', event)
    }

    provider({ props, updateParentValue, parentValue, parentChangeHandler })

    watch(parentValue, (cur) => emit('update:modelValue', cur))

    return () => <div class={`fect-checkbox__group ${props.useRow ? 'useRow' : ''}`}>{slots.default?.()}</div>
  },
})
