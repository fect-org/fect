import { computed, toRefs } from 'vue'
import { createNameSpace, theme, createProvider } from '../utils'
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
      default: '300px',
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
  emits: ['open', 'close'],
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READONLY_MODAL_KEY)
    provider(props)
    return () => <ModalWrapper {...attrs} v-slots={slots} />
  },
})
