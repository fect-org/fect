import { PropType, watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { createCollapseContext } from './collapse-context'
import './index.less'

const name = createName('CollapseGroup')
const bem = createBem('fect-collapse')

export default defineComponent({
  name,
  props: {
    accordion: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: [Array] as PropType<number[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const { provider } = createCollapseContext()

    const [checked, setChecked] = useState<number[]>(props.modelValue)

    /**
     * We use the index value of the component to control the expand of collapse
     */

    const updateCollapseGroupChecked = (idx: number) => {
      setChecked((pre) => {
        const cursor = pre.indexOf(idx)
        const exist = cursor !== -1
        if (exist) return pre.filter((item) => item !== idx)
        if (props.accordion) pre.length = 0
        return [...pre, idx]
      })
    }

    provider({ checked, updateCollapseGroupChecked })

    watch(checked, (cur) => emit('update:modelValue', cur))

    return () => <div class={bem('group')}> {slots.default?.()}</div>
  }
})
