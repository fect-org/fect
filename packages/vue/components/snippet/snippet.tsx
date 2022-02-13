import { computed, defineComponent } from 'vue'
import { useClipboard } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { props } from './props'
import SnippetIcon from './snippet-icon'
import Toast from '../toast'
import './index.less'

const name = createName('Snippet')
const bem = createBem('fect-snippet')

export default defineComponent({
  name,
  props,
  setup(props) {
    const showCopyIcon = computed(() => props.copy !== 'prevent')

    const { copyText } = useClipboard()
    const setSnippetClass = computed(() => {
      const { type, fill } = props
      const prevent = !showCopyIcon.value

      return bem(null, { type, fill, disabled: prevent })
    })

    const copyHandler = () => {
      const { text, copy, toastText, toastType } = props
      copyText(text)
      if (copy === 'silent') return
      Toast({ text: toastText, type: toastType })
    }

    return () => (
      <div class={setSnippetClass.value} style={{ width: props.width }}>
        <span>
          {props.symbol && <span>{props.symbol}</span>}
          {props.text}
        </span>
        {showCopyIcon.value && (
          <div class={bem('copy')} onClick={copyHandler}>
            <SnippetIcon />
          </div>
        )}
      </div>
    )
  }
})
