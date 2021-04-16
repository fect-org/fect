import { computed } from 'vue'
import { createNameSpace, validator, theme } from '../utils'
const [createComponent] = createNameSpace('Snippet')
import SnippetIcon from './snippet.icon'
const { snippetCopyTypes, normalTypes } = theme
import './snippet.less'

export default createComponent({
  props: {
    text: {
      type: String,
      default: '',
      require: true,
    },
    width: {
      type: [String, Number],
      default: 'initial',
    },
    fill: Boolean,
    type: {
      type: String,
      default: 'default',
      validator: validator.enums(normalTypes),
    },
    copy: {
      type: String,
      default: 'default',
      validator: validator.enums(snippetCopyTypes),
    },
    symbol: {
      type: String,
      default: '$',
    },
    toastText: {
      type: String,
      default: 'Copied to clipboard!',
    },
    toastType: {
      type: String,
      default: 'success',
      validator: validator.enums(normalTypes),
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { copy, toastType, width, type, symbol, toastText, fill } = props
    const getSnippetClass = computed(() => {
      let str = ''
      type && (str += ` ${type}`)
      fill && (str += ' fill')
      return str.trim()
    })
    return () => (
      <div class={`fect-snippet ${getSnippetClass.value}`} style={{ width }}>
        <span>
          <span>{symbol}</span>
          {props.text}
        </span>
        <SnippetIcon />
      </div>
    )
  },
})
