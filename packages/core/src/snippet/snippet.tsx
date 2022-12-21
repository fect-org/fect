import { computed, defineComponent } from 'vue'
import { useClipboard } from '@fect-ui/vue-hooks'
import { isArray, arrayTextToString } from '@fect-ui/shared'
import { createName, createBem } from '../utils'
import type { CSSProperties } from '../utils'
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

    const isMultiple = computed(() => isArray(props.text))

    const { copyText } = useClipboard()

    const text = computed(() => (isArray(props.text) ? arrayTextToString(props.text) : props.text))

    const copyHandler = () => {
      const { copy, toastText, toastType } = props
      copyText(text.value)
      if (copy === 'silent') return
      Toast({ text: toastText, type: toastType })
    }

    const setStyle = computed(() => {
      const str = props.symbol.trim()
      return {
        width: props.width,
        '--snippet-symbol': str ? `'${str} '` : ''
      } as CSSProperties
    })

    return () => {
      const { text, type, fill } = props

      return (
        <div class={bem(null, { type, fill })} style={setStyle.value}>
          {isMultiple.value ? (
            (text as string[]).map((t, i) => <pre key={`snippet-${i}-$${t}`}>{t}</pre>)
          ) : (
            <pre>{text}</pre>
          )}
          {showCopyIcon.value && (
            <div class={bem('copy', { multiple: isMultiple.value })} onClick={copyHandler}>
              <SnippetIcon />
            </div>
          )}
        </div>
      )
    }
  }
})
