import { defineComponent, watch } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, useExpose } from '../utils'
import { Tooltip, TooltipProps } from '../tooltip'
import { props } from './props'

import './index.less'

type PopoverProps = Omit<TooltipProps, 'content'>

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

    const popoverProps: PopoverProps = {
      placement: props.placement,
      visible: visible.value,
      type: props.type,
      visibleArrow: props.visibleArrow,
      hideAfter: props.hideAfter,
      showAfter: props.showAfter,
      trigger: props.trigger,
      offset: props.offset,
      portalClass: `popover ${props.portalClass}`
    }

    return () => (
      <Tooltip onChange={changeHandler} v-slots={{ content: slots.default?.() }} {...popoverProps}>
        {slots.widget?.()}
      </Tooltip>
    )
  }
})
