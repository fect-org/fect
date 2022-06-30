import { watch, defineComponent, Teleport } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import ModalWrapper from './modal-wrapper'
import Backdrop from '../backdrop'
import { createModalContext } from './modal-context'
import { props } from './props'
import { useKeyboard, KeyCode, useBodyScroll } from '../composables'
import type { Action } from './interface'

import './index.less'

const name = createName('Modal')

export default defineComponent({
  name,
  inheritAttrs: false,
  props,
  emits: ['update:visible', 'cancel', 'confirm'],
  setup(props, { attrs, slots, emit }) {
    const [selfVisible, setSelfVisible] = useState<boolean>(false)

    const { setLock } = useBodyScroll()

    const { provider } = createModalContext()

    const closeModal = (action: Action) => {
      setSelfVisible(false)
      setLock(false)
      emit(action)
    }

    provider({ props, closeModal })

    watch(
      () => props.visible,
      (cur) => setSelfVisible(cur)
    )
    watch(selfVisible, (cur) => {
      setLock(cur)
      emit('update:visible', cur)
    })

    const closeFormBackHandler = () => {
      if (props.disableOverlayClick) return
      closeModal('cancel')
    }

    const { bindings } = useKeyboard(() => props.keyboard && closeModal('cancel'), KeyCode.Escape, {
      disableGlobalEvent: true
    })

    return () => (
      <Teleport to={props.teleport}>
        <Backdrop
          visible={selfVisible.value}
          layerClassName={props.overlay ? '' : 'hidden'}
          onClick={closeFormBackHandler}
          {...bindings}
        >
          <ModalWrapper visible={selfVisible.value} v-slots={slots} {...attrs} />
        </Backdrop>
      </Teleport>
    )
  }
})
