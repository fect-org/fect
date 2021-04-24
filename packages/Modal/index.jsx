import { Transition } from 'vue'
import { createNameSpace, createProvider } from '../utils'
import { READONLY_MODAL_KEY } from './ModalKey'
import './modal.less'
import ModalWrapper from './modal.wrapper'

const [createComponent] = createNameSpace('Modal')

export default createComponent({
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '420px',
    },
    cancel: {
      type: String,
      default: 'cancel',
    },
    done: {
      type: String,
      default: 'done',
    },
  },
  emits: ['update:visible'],
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READONLY_MODAL_KEY)
    const updateVisibleValue = (pre) => emit('update:visible', pre)
    provider({ props, updateVisibleValue })

    return () => (
      <>
        {props.visible ? (
          <Transition name="fect-dialog-backdrop">
            <div className="fect-dialog_root">
              <div className="fect-dialog-backdrop"></div>
              <div className="fect-dialog-backdrop responsive"></div>
              <ModalWrapper {...attrs} v-slots={slots} />
            </div>
          </Transition>
        ) : (
          ''
        )}
      </>
    )
  },
})
