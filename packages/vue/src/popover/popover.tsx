import { defineComponent, watch } from 'vue'
import { useState, useExpose } from '@fect-ui/vue-hooks'
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

    const changeHandler = (state: boolean) => setVisible(state)

    watch(visible, (cur) => {
      emit('change', cur)
      emit('update:visible', cur)
    })

    useExpose({ changeHandler })

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
      <Tooltip onChange={changeHandler} v-slots={{ content: slots.default?.() }} {...popoverProps}>
        {slots.widget?.()}
      </Tooltip>
    )
  }
})
