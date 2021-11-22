import { PropType, Ref, defineComponent } from 'vue'
import { createProvider, useState } from '@fect-ui/vue-hooks'
import { createName, NormalSizes } from '../utils'
import './index.less'

const name = createName('RadioGroup')

export const READNONLY_RADIO_KEY = 'radioKey'

type Parent = number | string

export type RadioGroupProvide = {
  props: {
    modelValue: string | number
    useRow: boolean
    disabled: boolean
    size: NormalSizes
  }
  updateState: (val: RadioEvent) => void
  parentValue: Ref<Parent>
  setCurrentValue: (val: Parent) => void
}

interface RadioEeventTarget {
  checked?: boolean
  checkedVal?: string | number
}

export interface RadioEvent {
  target: RadioEeventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

export default defineComponent({
  name,
  props: {
    modelValue: [String, Number],
    useRow: Boolean,
    disabled: Boolean,
    size: {
      type: String as PropType<NormalSizes>,
      default: 'medium',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const [parentValue, setParentValue] = useState<Parent>(props.modelValue)
    const { provider } = createProvider(READNONLY_RADIO_KEY)
    const updateState = (nextVal: RadioEvent) => emit('change', nextVal)

    const setCurrentValue = (val: string | number) => {
      setParentValue(val)
      emit('update:modelValue', parentValue)
    }

    provider({ props, updateState, setCurrentValue, parentValue })

    return () => <div class={`fect-radio__group ${props.useRow ? 'useRow' : ''}`}>{slots.default?.()}</div>
  },
})
