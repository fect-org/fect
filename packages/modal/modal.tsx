import { PropType, watch, defineComponent } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { useState, createName } from '../utils'
import { READONLY_MODAL_KEY } from './type'
import ModalWrapper from './modal-wrapper'
import Teleport from '../teleport'
import './index.less'

const name = createName('Modal')

export default defineComponent({
  name,
  props: {
    visible: Boolean,
    title: {
      tupe: String,
      default: '',
    },
    width: {
      type: String,
      default: '400px',
    },
    cancel: {
      type: String,
      default: 'cancel',
    },
    done: {
      type: String,
      default: 'done',
    },
    teleport: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'body',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:visible'],
  setup(props, { attrs, slots, emit }) {
    const [selfVisible, setSelfVisible] = useState<boolean>(props.visible)

    const { provider } = createProvider(READONLY_MODAL_KEY)

    provider({ props, setSelfVisible, selfVisible })

    watch(
      () => props.visible,
      (cur) => setSelfVisible(cur),
    )
    watch(selfVisible, (cur) => emit('update:visible', cur))

    const popupClickHandler = (e: Event) => {
      const el = e.target as HTMLElement
      if (el.className !== 'fect-modal__root') return
      setSelfVisible(!props.visible)
    }

    return () => (
      <Teleport
        teleport={props.teleport}
        overlay={props.overlay}
        scroll={selfVisible.value}
        popupClass="fect-modal__root"
        transition="modal-fade"
        v-model={[selfVisible.value, 'show']}
        onPopupClick={popupClickHandler}
      >
        <ModalWrapper {...attrs} v-slots={slots} />
      </Teleport>
    )
  },
})
