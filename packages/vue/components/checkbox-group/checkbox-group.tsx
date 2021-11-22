import { PropType, Ref, watch, defineComponent } from 'vue'
import { createName, NormalSizes } from '../utils'
import { createProvider, useState } from '@fect-ui/vue-hooks'
import './index.less'

const name = createName('CheckboxGroup')

export const READONLY_CHECKBOX_KEY = 'checkboxKey'

interface CheckboxEeventTarget {
  checked?: boolean
  value?: string[]
}

export interface CheckboxEvent {
  target: CheckboxEeventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

export type CheckboxGroupProvide = {
  props: {
    disabled: boolean
    modelValue: string[]
    size: NormalSizes
    useRow: boolean
  }
  parentValue: Ref<string[]>
  updateParentValue: (val: string, checked: boolean) => void
  parentChangeHandler: (e: CheckboxEvent) => void
}

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
