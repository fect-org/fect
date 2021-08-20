import { watch } from 'vue'
import { createNameSpace, useState } from '../utils'
import { props } from './props'
import Teleport from '../teleport'
import DrawerWrapper from './drawer-wrapper'
import './index.less'

const [createComponent] = createNameSpace('Drawer')

export default createComponent({
  props,
  emits: ['update:modelValue', 'clickCloseIcon'],
  setup(props, { slots, emit, attrs }) {
    const [visible, setVisible] = useState<boolean>(props.modelValue)

    return (
      <Teleport
        teleport="body"
        overlay={props.overlay}
        scroll={visible.value}
        v-model={[visible.value, 'show']}
      >
        <DrawerWrapper
          visible={visible.value}
          placement={props.placement}
          {...attrs}
          v-slots={slots}
        />
      </Teleport>
    )
  },
})
