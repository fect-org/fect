import { computed, toRefs } from 'vue'
import { createNameSpace, createProvider, theme } from '../utils'
import './select.less'

const [createComponent] = createNameSpace('Select')

const { tuple, normalSizes } = theme

const READONLY_SELECT_KEY = 'selectKey'

export default createComponent({
  props: {
    modelValue: {
      type: [String],
      default: '',
    },
    placeholder: {
      type: [String],
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    width: {
      type: String,
      default: 'initial',
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READONLY_SELECT_KEY)
    provider(props)

    return () => <div class="fect-select">{slots.default?.()}</div>
  },
})
