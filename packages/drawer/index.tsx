import { watch, computed } from 'vue'
import { createNameSpace, useState } from '../utils'
import { CustomCSSProperties } from '../utils/base'
import { props } from './props'
import Teleport from '../teleport'
import DrawerWrapper from './drawer-wrapper'
import { getDrawerTransfrom } from './style'
import './index.less'

const [createComponent] = createNameSpace('Drawer')

export default createComponent({
  props,
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const [visible, setVisible] = useState<boolean>(props.modelValue)

    const setDrawerStyle = computed(() => {
      const { placement } = props
      const styles: CustomCSSProperties = {
        '--drawer-transfrom': getDrawerTransfrom(placement),
      }
      return styles
    })

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
        style={setDrawerStyle.value}
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
