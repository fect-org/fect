import { computed, defineComponent } from 'vue'
import { len } from '@fect-ui/shared'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem, withClassName } from '../utils'

import './index.less'

const name = createName('Avatar')
const bem = createBem('fect-avatar')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    stacked: Boolean,
    isSquare: Boolean,
    text: {
      type: String,
      default: ''
    },
    alt: String,
    src: String,
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs }) {
    const { SCALES } = useScale()
    const { theme } = useTheme()

    const safeText = (text: string) => {
      if (typeof text !== 'string') return ''
      return len(text) > 4 ? text.slice(0, 3) : text
    }

    const setCssVariables = computed(() => {
      const { palette, layout } = theme.value
      return {
        '--avatar-border-color': palette.accents_2,
        '--avatar-bg-color': palette.background,
        '--avatar-radius': layout.radius,
        '--avatar-size': SCALES.width(1.75) || SCALES.height(1.75),
        '--avatar-pt': SCALES.pt(0),
        '--avatar-pr': SCALES.pr(0),
        '--avatar-pb': SCALES.pb(0),
        '--avatar-pl': SCALES.pl(0),
        '--avatar-mt': SCALES.mt(0),
        '--avatar-mr': SCALES.mr(0),
        '--avatar-mb': SCALES.mb(0),
        '--avatar-ml': props.stacked ? SCALES.ml(-0.625) : SCALES.ml(0),
        '--avatar-font-size': SCALES.font(1)
      }
    })

    return () => (
      <div
        class={withClassName(bem(null, { square: props.isSquare, stacked: props.stacked }), props.className)}
        style={setCssVariables.value}
      >
        {props.src ? (
          <img src={props.src} draggable="false" alt={props.alt} {...attrs} />
        ) : (
          <span class={bem('text')} {...attrs}>
            {safeText(props.text)}
          </span>
        )}
      </div>
    )
  }
})
