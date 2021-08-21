import { watch } from 'vue'
import { createNameSpace, useState } from '../utils'
import { props } from './props'
import Teleport from '../teleport'
import DrawerWrapper from './drawer-wrapper'
import './index.less'

const [createComponent] = createNameSpace('Drawer')

export default createComponent({
  props,
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const [visible, setVisible] = useState<boolean>(props.modelValue)

    watch(
      () => props.modelValue,
      (cur) => setVisible(cur),
    )

    watch(visible, (cur) => emit('update:modelValue', cur))

    const poupClickHandler = (e: Event) => {
      if (props.disableOverlayClick) return
      const el = e.target as HTMLElement
      if (el.className !== 'fect-drawer__root') return
      setVisible(!visible.value)
    }

    return () => (
      <Teleport
        teleport="body"
        overlay={props.overlay}
        scroll={visible.value}
        show={visible.value}
        popupClass="fect-drawer__root"
        transition="drawer-fade"
        onPopupClick={poupClickHandler}
      >
        <DrawerWrapper
          placement={props.placement}
          round={props.round}
          v-slots={slots}
          {...attrs}
        />
      </Teleport>
    )
  },
})
