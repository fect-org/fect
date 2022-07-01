import { watch, defineComponent, Teleport, computed } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import Backdrop from '../backdrop'
import { createName } from '../utils'
import { props } from './props'
import { useBodyScroll, useKeyboard, KeyCode } from '../composables'
import DrawerWrapper from './drawer-wrapper'
import { getDrawerTransfrom } from './style'

import type { CSSProperties } from '../utils'

import './index.less'

const name = createName('Drawer')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const [visible, setVisible] = useState<boolean>(props.modelValue)

    const { setLock } = useBodyScroll()

    const { bindings } = useKeyboard(() => setVisible(false), KeyCode.Escape, {
      disableGlobalEvent: true
    })

    watch(
      () => props.modelValue,
      (cur) => setVisible(cur)
    )

    watch(visible, (cur) => {
      setLock(cur)
      emit('update:modelValue', cur)
    })

    const closeFormBackHandler = () => {
      if (props.disableOverlayClick) return
      setVisible(false)
    }

    const setDrawerStyle = computed(() => {
      const { placement } = props
      const styles: CSSProperties = {
        '--drawer-transfrom': getDrawerTransfrom(placement)
      }
      return styles
    })

    return () => (
      <Teleport to={props.teleport}>
        <Backdrop
          visible={visible.value}
          layerClassName={props.overlay ? '' : 'hidden'}
          onClick={closeFormBackHandler}
          style={setDrawerStyle.value}
          {...bindings}
        >
          <DrawerWrapper
            visible={visible.value}
            placement={props.placement}
            round={props.round}
            v-slots={slots}
            {...attrs}
          />
        </Backdrop>
      </Teleport>
    )
  }
})
