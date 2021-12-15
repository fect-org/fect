import { watch, defineComponent, ref, reactive, toRefs } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, ComponentInstance } from '../utils'
import ModalWrapper from './modal-wrapper'
import { createModalContext } from './modal-context'
import Teleport from '../teleport'
import { props } from './props'
import type { Action } from './interface'

import './index.less'

const name = createName('Modal')

export default defineComponent({
  name,
  props,
  emits: ['update:visible', 'cancel', 'confirm'],
  setup(props, { attrs, slots, emit }) {
    const modalRef = ref<ComponentInstance>()

    const [selfVisible, setSelfVisible] = useState<boolean>(false)

    const [action, setAction] = useState<Action>('')

    const { provider } = createModalContext()

    provider({ ...reactive(toRefs(props)), setSelfVisible, selfVisible, setAction })

    watch(
      () => props.visible,
      (cur) => {
        setSelfVisible(cur)
        setAction('')
      }
    )
    watch(selfVisible, (cur) => emit('update:visible', cur))

    watch(action, (cur) => {
      if (cur === 'cancel') emit('cancel')
      if (cur === 'confirm') emit('confirm')
    })

    const popupClickHandler = (e: MouseEvent) => {
      const element = modalRef.value!.$el
      if (element && element.contains(e.target as Node)) return
      setSelfVisible(!selfVisible.value)
      setAction('cancel')
    }

    return () => (
      <Teleport
        teleport={props.teleport}
        overlay={props.overlay}
        scroll={selfVisible.value}
        popupClass="fect-modal__root"
        transition="modal-fade"
        show={selfVisible.value}
        onPopupClick={popupClickHandler}
      >
        <ModalWrapper {...attrs} v-slots={slots} ref={modalRef} />
      </Teleport>
    )
  }
})
