import { computed, defineComponent } from 'vue'
import { useClipboard } from '@fect-ui/vue-hooks'
import { useScale } from '@fect-ui/scale'
import { isArray, arrayTextToString } from '@fect-ui/shared'
import { useTheme } from '../composables'
import { createName, createBem, SnippetStyleTypes } from '../utils'
import { props } from './props'
import SnippetIcon from './snippet-icon'
import Toast from '../toast'
import type { UIThemesPalette } from '../themes'

import './index.less'

const name = createName('Snippet')
const bem = createBem('fect-snippet')

function getSnippetColors(palette: UIThemesPalette, type: SnippetStyleTypes, fill: boolean) {
  const colors: Record<SnippetStyleTypes, { color: string; border: string; bgColor: string }> = {
    default: {
      color: palette.foreground,
      border: palette.border,
      bgColor: palette.background
    },
    success: {
      color: palette.success,
      border: palette.success,
      bgColor: palette.background
    },
    warning: {
      color: palette.warning,
      border: palette.warning,
      bgColor: palette.background
    },
    error: {
      color: palette.error,
      border: palette.error,
      bgColor: palette.background
    },
    secondary: {
      color: palette.secondary,
      border: palette.secondary,
      bgColor: palette.background
    },
    lite: {
      color: palette.foreground,
      border: palette.border,
      bgColor: palette.accents_1
    },
    dark: {
      color: palette.background,
      border: palette.foreground,
      bgColor: palette.foreground
    }
  }
  const filled: Array<SnippetStyleTypes> = ['success', 'warning', 'error', 'secondary']
  const color = colors[type]
  const shouldFilled = filled.includes(type)
  if (!fill || !shouldFilled) return color
  return { ...color, color: color.bgColor, bgColor: color.color }
}

export default defineComponent({
  name,
  props,
  setup(props) {
    const { SCALES } = useScale()
    const { theme } = useTheme()
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

    const baseStyle = computed(() => {
      const str = props.symbol.trim()
      const { color, bgColor, border } = getSnippetColors(theme.value.palette, props.type, props.fill)
      return {
        '--snippet-symbol': str ? `'${str} '` : '',
        '--snippet-color': color,
        '--snippet-bg-color': bgColor,
        '--snippet-border': border
      }
    })

    const setCssVariables = computed(() => {
      return {
        ...baseStyle.value,
        '--snippet-width': SCALES.width(1, 'inital'),
        '--snippet-height': SCALES.height(1, 'auto'),
        '--snippet-font-size': SCALES.font(0.8125),
        '--snippet-pt': SCALES.pt(0.667),
        '--snippet-pr': SCALES.pr(2.667),
        '--snippet-pb': SCALES.pb(0.667),
        '--snippet-pl': SCALES.pl(0.667),
        '--snippet-mt': SCALES.mt(0),
        '--snippet-mr': SCALES.mr(0),
        '--snippet-mb': SCALES.mb(0),
        '--snippet-ml': SCALES.ml(0)
      }
    })

    return () => {
      const { text, type, fill } = props

      return (
        <div class={bem(null, { type, fill })} style={setCssVariables.value}>
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
