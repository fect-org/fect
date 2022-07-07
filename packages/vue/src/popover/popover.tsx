import { defineComponent, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, pick, assign } from '../utils'
import Tooltip from '../tooltip'
import { props } from './props'

import './index.less'

const name = createName('Popover')

export default defineComponent({
  name,
  props,
  emits: ['change', 'update:visible'],
  setup(props, { emit, slots }) {
    const [visible, setVisible] = useState<boolean>(props.visible)

    watch(visible, (cur) => {
      emit('change', cur)
      emit('update:visible', cur)
    })

    const popoverProps = assign(
      pick(props, [
        'placement',
        'type',
        'visibleArrow',
        'hideAfter',
        'showAfter',
        'trigger',
        'offset',
        'disabled',
        'teleport'
      ]),
      {
        visible: visible.value,
        portalClass: `popover ${props.portalClass}`
      }
    )
    return () => (
      <Tooltip v-slots={{ content: slots.default?.() }} {...popoverProps} onChange={setVisible}>
        {slots.widget?.()}
      </Tooltip>
    )
  }
})
