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
  },
  emits: ['update:visible'],
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READONLY_MODAL_KEY)
    const updateVisibleValue = (pre) => emit('update:visible', pre)
    provider({ props, updateVisibleValue })

    return () => (
      <Transition name="fect-dialog-backdrop">
        <div className="fect-dialog_root" v-show={props.visible}>
          <div className="fect-dialog-backdrop"></div>
          <div
            className="fect-dialog-backdrop responsive"
            onClick={() => updateVisibleValue(false)}
          ></div>
          <ModalWrapper {...attrs} v-slots={slots} />
        </div>
      </Transition>
    )
  },
})
