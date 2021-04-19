
import { validator, createNameSpace, theme, createProvider } from '../utils'
import ToastItem from './toast.item'
const [createComponent] = createNameSpace('Toast')
import './toast.less'

const { normalTypes } = theme

const READNONLY_TOAST_KEY = 'toastKey'

export default createComponent({
  props: {
    text: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'default',
      validator: validator.enums(normalTypes),
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READNONLY_TOAST_KEY)
    provider(props)
    /**
     * container will created when event is triggered
     */
    return () => <ToastItem />
  },
})
