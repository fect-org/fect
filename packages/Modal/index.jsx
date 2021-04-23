import { createNameSpace, createProvider } from '../utils'
import { READONLY_MODAL_KEY } from './ModalKey'
const [createComponent] = createNameSpace('Modal')
import './modal.less'
import ModalWrapper from './modal.wrapper'

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
      <>{props.visible ? <ModalWrapper {...attrs} v-slots={slots} /> : ''}</>
    )
  },
})
