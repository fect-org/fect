import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { assign } from '@fect-ui/shared'
import { useTheme } from '../composables'
import { createName, createBem, addColorAlpha } from '../utils'

import './index.less'

const name = createName('Code')

const bem = createBem('fect-code')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    block: Boolean,
    name: String,
    classic: Boolean
  },
  setup(props, { slots, attrs }) {
    const { theme } = useTheme()
    const { SCALES } = useScale()

    const baseStyle = computed(() => {
      const { palette, layout } = theme.value
      const style = props.classic
        ? {
            border: palette.accents_2,
            background: palette.background
          }
        : {
            border: palette.accents_1,
            background: addColorAlpha(palette.accents_1, 0.75)
          }
      return assign(style, {
        radius: layout.radius
      })
    })

    const nameStyle = computed(() => {
      const { palette } = theme.value
      return {
        border: palette.accents_2,
        bgColor: palette.accents_2,
        color: palette.accents_5
      }
    })

    const setCssVariables = computed(() => {
      const { border, background, radius } = baseStyle.value
      const { border: nameBorder, bgColor, color } = nameStyle.value
      return {
        '--code-border': border,
        '--code-bg-color': background,
        '--code-radius': radius,
        '--code-name-border': nameBorder,
        '--code-name-bg-color': bgColor,
        '--code-name-color': color,
        '--code-font-size': SCALES.font(0.875),
        '--code-width': SCALES.width(1, 'initial'),
        '--code-height': SCALES.height(1, 'auto'),
        '--code-pt': SCALES.pt(1.1),
        '--code-pr': SCALES.pr(1),
        '--code-pb': SCALES.pb(1.1),
        '--code-pl': SCALES.pl(1),
        '--code-mt': SCALES.mt(1.3),
        '--code-mr': SCALES.mr(0),
        '--code-mb': SCALES.mb(1.3),
        '--code-ml': SCALES.ml(0),
        '--code-name-pt': SCALES.font(0.32),
        '--code-name-pr': SCALES.pr(0.5),
        '--code-name-pb': SCALES.pb(0.32),
        '--code-name-pl': SCALES.pl(0.5),
        '--code-name-font-size': SCALES.font(0.8125)
      }
    })

    return () => {
      if (!props.block) return <code {...attrs}>{slots.default?.()}</code>
      const { name, classic } = props
      return (
        <div class={bem(null, { classic })} style={setCssVariables.value}>
          {name && <header class={bem('name')}>{name}</header>}
          <pre {...attrs}>{slots.default?.()}</pre>
        </div>
      )
    }
  }
})
