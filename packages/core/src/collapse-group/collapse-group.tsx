import { watch, defineComponent, computed } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useScale } from '@fect-ui/scale'
import { createName, createBem } from '../utils'
import { createCollapseContext } from './collapse-context'

import type { PropType } from 'vue'

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
    const { SCALES } = useScale()

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

    const setCssVariables = computed(() => {
      return {
        '--collapse-group-width': SCALES.width(1, 'auto'),
        '--collapse-group-height': SCALES.height(1, 'auto'),
        '--collapse-group-pt': SCALES.pt(0),
        '--collapse-group-pr': SCALES.pr(0.6),
        '--collapse-group-pb': SCALES.pb(0),
        '--collapse-group-pl': SCALES.pl(0.6),
        '--collapse-group-mt': SCALES.mt(0),
        '--collapse-group-mr': SCALES.mr(0),
        '--collapse-group-mb': SCALES.mb(0),
        '--collapse-group-ml': SCALES.ml(0)
      }
    })

    provider({ checked, updateCollapseGroupChecked })

    watch(checked, (cur) => emit('update:modelValue', cur))

    return () => (
      <div class={bem('group')} style={setCssVariables.value}>
        {' '}
        {slots.default?.()}
      </div>
    )
  }
})
