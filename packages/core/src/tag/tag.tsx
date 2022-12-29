import { computed, PropType, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem } from '../utils'
import type { SnippetStyleTypes } from '../utils'
import type { UIThemesPalette } from '../themes'

import './index.less'

export type TagTypes = SnippetStyleTypes

const name = createName('Tag')
const bem = createBem('fect-tag')

function getTagColors(palette: UIThemesPalette, type: TagTypes, invert: boolean, userColor?: string) {
  const colors: Record<TagTypes, { color: string; bgColor?: string }> = {
    default: {
      color: palette.foreground
    },
    success: {
      color: palette.success
    },
    warning: {
      color: palette.warning
    },
    error: {
      color: palette.error
    },
    secondary: {
      color: palette.secondary
    },
    dark: {
      color: palette.foreground
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.accents_2
    }
  }
  const hideBorder = invert || type === 'lite'
  const style = userColor
    ? { color: userColor, bgColor: palette.background, borderColor: userColor }
    : {
        ...colors[type],
        bgColor: colors[type].bgColor || palette.background,
        borderColor: colors[type].color
      }
  if (hideBorder) style.borderColor = 'transparent'
  if (invert) return { ...style, color: style.bgColor, bgColor: style.color }
  return style
}

export default defineComponent({
  name,
  props: {
    text: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String as PropType<TagTypes>,
      default: 'default'
    },
    useInvert: Boolean,
    color: String
  },
  setup(props) {
    const { SCALES } = useScale()

    const { theme } = useTheme()

    const colors = computed(() => getTagColors(theme.value.palette, props.type, props.useInvert, props.color))

    const setCssVariables = computed(() => {
      const { bgColor, borderColor, color } = colors.value
      return {
        '--tag-color': color,
        '--tag-bg-color': bgColor,
        '--tag-border-color': borderColor,
        '--tag-font-size': SCALES.font(0.875),
        '--tag-radius': SCALES.height(0.3125),
        '--tag-width': SCALES.width(1, 'auto'),
        '--tag-height': SCALES.height(1.75),
        '--tag-pt': SCALES.pt(0.375),
        '--tag-pr': SCALES.pr(0.375),
        '--tag-pb': SCALES.pb(0.375),
        '--tag-pl': SCALES.pl(0.375),
        '--tag-mt': SCALES.mt(0),
        '--tag-mr': SCALES.mr(0),
        '--tag-mb': SCALES.mb(0),
        '--tag-ml': SCALES.ml(0)
      }
    })

    return () => (
      <div class={bem(null, [props.type, { invert: props.useInvert }])} style={setCssVariables.value}>
        {props.text}
      </div>
    )
  }
})
