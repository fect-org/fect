import { PropType, defineComponent } from 'vue'
import { createProvider, useState } from '@fect-ui/vue-hooks'
import { createName, NormalSizes } from '../utils'
import { READNONLY_RADIO_KEY } from './type'
import type { RadioEvent, Parent } from './type'
import './index.less'

const name = createName('RadioGroup')

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
