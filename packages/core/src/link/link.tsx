import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { createName, createBem, addColorAlpha } from '../utils'
import { useRoute, useTheme } from '../composables'
import './index.less'

const name = createName('Link')
const bem = createBem('fect-link')

export default defineComponent({
  name,
  props: {
    href: {
      type: String,
      default: ''
    },
    to: {
      type: [String, Object],
      default: ''
    },
    color: Boolean,
    underline: Boolean,
    block: Boolean
  },
  setup(props, { slots }) {
    const route = useRoute()

    const { SCALES } = useScale()
    const { theme } = useTheme()

    const safeHref = computed(() => {
      if (props.to) return 'javascript: void 0;'
      return props.href
    })

    const baseStyle = computed(() => {
      const { palette, layout } = theme.value
      return {
        color: props.color || props.block ? palette.link : 'inherit',
        hoverColor: props.color || props.block ? palette.successLight : 'inherit',
        radius: layout.radius,
        bgColor: addColorAlpha(palette.link, 0.1)
      }
    })

    const setCssVariables = computed(() => {
      const { color, hoverColor, radius, bgColor } = baseStyle.value
      return {
        '--link-color': color,
        '--link-hover-color': hoverColor,
        '--link-radius': radius,
        '--link-bg-color': bgColor,
        '--link-font-size': SCALES.font(1, 'inherit'),
        '--link-width': SCALES.width(1, 'fit-content'),
        '--link-height': SCALES.height(1, 'auto'),
        '--link-pt': SCALES.pt(0),
        '--link-pr': SCALES.pr(0),
        '--link-pb': SCALES.pb(0),
        '--link-pl': SCALES.pl(0),
        '--link-mt': SCALES.mt(0),
        '--link-mr': SCALES.mr(0),
        '--link-mb': SCALES.mb(0),
        '--link-ml': SCALES.ml(0),
        '--link-block-pt': SCALES.pt(0.268),
        '--link-block-pr': SCALES.pr(0.5625),
        '--link-block-pb': SCALES.pb(0.268),
        '--link-block-pl': SCALES.pl(0.5625)
      }
    })

    const goToHandler = () => props.to && route?.push(props.to)

    return () => (
      <a
        class={bem(null, { underline: props.underline, block: props.block })}
        style={setCssVariables.value}
        href={safeHref.value}
        onClick={goToHandler}
      >
        {slots.default?.()}
      </a>
    )
  }
})
