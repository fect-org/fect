import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem } from '../utils'
import './index.less'

const name = createName('Card')
const bem = createBem('fect-card')

export default defineComponent({
  name,
  props: {
    hoverable: Boolean,
    shadow: Boolean
  },
  setup(props, { slots }) {
    const { SCALES } = useScale()

    const { theme } = useTheme()

    const hoverShadow = computed(() => {
      const { expressiveness } = theme.value
      if (props.shadow) return expressiveness.shadowMedium
      return props.hoverable ? expressiveness.shadowSmall : 'none'
    })

    const baseStyle = computed(() => {
      const { layout, palette } = theme.value
      return {
        radius: layout.radius,
        bgColor: palette.background,
        borderColor: palette.border
      }
    })

    const setCssVariables = computed(() => {
      const { radius, bgColor, borderColor } = baseStyle.value
      return {
        '--card-radius': radius,
        '--card-bg-color': bgColor,
        '--card-border-color': borderColor,
        '--card-hover-shadow': hoverShadow.value,
        '--card-shadow': theme.value.expressiveness.shadowSmall,
        '--card-width': SCALES.width(1, 'auto'),
        '--card-height': SCALES.height(1, 'auto'),
        '--card-pt': SCALES.pt(0),
        '--card-pr': SCALES.pr(0),
        '--card-pb': SCALES.pb(0),
        '--card-pl': SCALES.pl(0),
        '--card-mt': SCALES.mt(0),
        '--card-mr': SCALES.mr(0),
        '--card-mb': SCALES.mb(0),
        '--card-ml': SCALES.ml(0)
      }
    })

    const setContentCssVariables = computed(() => {
      return {
        '--card-content-width': SCALES.width(1, 'auto'),
        '--card-content-height': SCALES.height(1, 'auto'),
        '--card-content-pt': SCALES.pt(1),
        '--card-content-pr': SCALES.pr(1),
        '--card-content-pb': SCALES.pb(1),
        '--card-content-pl': SCALES.pl(1),
        '--card-content-mt': SCALES.mt(0),
        '--card-content-mr': SCALES.mr(0),
        '--card-content-mb': SCALES.mb(0),
        '--card-content-ml': SCALES.ml(0)
      }
    })

    return () => (
      <div class={bem(null, { shadow: props.shadow, hoverable: props.hoverable })} style={setCssVariables.value}>
        <div class={bem('content')} style={setContentCssVariables.value}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})
