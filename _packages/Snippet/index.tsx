import { computed, ref, PropType, CSSProperties } from 'vue'
import { createNameSpace, useClipboard } from '../utils'
import { NormalTypes, SnippetCopyTypes } from '../utils/theme/propTypes'
import SnippetIcon from './snippet-icon'
import Toast from '../Toast'
import './snippet.less'

const [createComponent] = createNameSpace('Snippet')

export default createComponent({
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    width: {
      type: [String, Number],
      default: 'initial',
    },
    fill: Boolean,
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default',
    },
    copy: {
      type: String as PropType<SnippetCopyTypes>,
      default: 'default',
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
    },
  },
  setup(props) {
    const { copy, toastType, width, type, symbol, toastText, fill } = props
    const showCopyIcon = ref(copy !== 'prevent')
    const { copyText } = useClipboard()
    const getSnippetClass = computed(() => {
      const names: string[] = []
      names.push(type)
      fill && names.push('fill')
      !showCopyIcon.value && names.push('disabled')
      return names.join(' ')
    })

    const clickCopyHandler = () => {
      if (copy !== 'default') return copyText(props.text)
      copyText(props.text)
      Toast({ text: toastText, type: toastType as NormalTypes })
    }

    return () => (
      <div class={`fect-snippet ${getSnippetClass.value}`} style={{ width }}>
        <span>
          {symbol && <span>{symbol}</span>}
          {props.text}
        </span>
        {showCopyIcon.value && (
          <div class="fect-snippet_copy" onClick={clickCopyHandler}>
            <SnippetIcon />
          </div>
        )}
      </div>
    )
  },
})
