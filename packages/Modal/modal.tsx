import { createNameSpace } from '../utils'
import { createProvider } from '@fect-ui/vue-hooks'
import { READONLY_MODAL_KEY } from './type'
import ModalWrapper from './modal-wrapper'

import './modal.less'
import { Transition } from 'vue'

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
  setup(props, { emit, attrs, slots }) {
    const { provider } = createProvider(READONLY_MODAL_KEY)
    const updateVisibleValue = (pre: boolean) => emit('update:visible', pre)
    provider({ props, updateVisibleValue })

    return () => (
      <Transition>
        <div class="fect-dialog_root" v-show={props.visible}>
          <div class="fect-dialog-backdrop"></div>
          <div
            class="fect-dialog-backdrop responsive"
            onClick={() => updateVisibleValue(false)}
          ></div>
          <ModalWrapper {...attrs} v-slots={slots} />
        </div>
      </Transition>
    )
  },
})
