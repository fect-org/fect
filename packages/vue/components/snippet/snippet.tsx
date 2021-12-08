import { computed, defineComponent } from 'vue'
import { useClipboard } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { props } from './props'
import SnippetIcon from './snippet-icon'
import Toast from '../toast'
import './index.less'

const name = createName('Snippet')

export default defineComponent({
  name,
  props,
  setup(props) {
    const showCopyIcon = computed(() => props.copy !== 'prevent')

    const { copyText } = useClipboard()
    const getSnippetClass = computed(() => {
      const { type, fill } = props
      const prevent = !showCopyIcon.value
      const names: string[] = []
      names.push(type)
      fill && names.push('fill')
      prevent && names.push('disabled')
      return names.join(' ')
    })

    const copyHandler = () => {
      const { text, copy, toastText, toastType } = props
      copyText(text)
      if (copy === 'silent') return
      Toast({ text: toastText, type: toastType })
    }

    return () => (
      <div class={`fect-snippet ${getSnippetClass.value}`} style={{ width: props.width }}>
        <span>
          {props.symbol && <span>{props.symbol}</span>}
          {props.text}
        </span>
        {showCopyIcon.value && (
          <div class="fect-snippet__copy" onClick={copyHandler}>
            <SnippetIcon />
          </div>
        )}
      </div>
    )
  }
})
