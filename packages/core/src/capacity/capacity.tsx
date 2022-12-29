import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { createName, addUnit } from '../utils'
import { useTheme } from '../provider/theme-context'
import './index.less'

const name = createName('Capacity')

export default defineComponent({
  name,
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    limit: {
      type: [Number, String],
      default: 0
    },
    color: String
  },
  setup(props) {
    const { SCALES } = useScale()

    const { theme } = useTheme()

    const color = computed(() => {
      if (props.color) return props.color
      const { palette } = theme.value
      const val = props.value
      if (val < 33) return palette.cyan
      if (val < 66) return palette.warning
      return palette.errorDark
    })

    const setCssVariables = computed(() => {
      const { palette, layout } = theme.value
      return {
        '--capacity-fill-color': color.value,
        '--capacity-radius': layout.radius,
        '--capacity-bg-color': palette.accents_2,
        '--capacity-width': SCALES.width(3.125),
        '--capacity-height': SCALES.height(0.625),
        '--capacity-pt': SCALES.pt(0),
        '--capacity-pr': SCALES.pr(0),
        '--capacity-pb': SCALES.pb(0),
        '--capacity-pl': SCALES.pl(0),
        '--capacity-mt': SCALES.mt(0),
        '--capacity-mr': SCALES.mr(0),
        '--capacity-mb': SCALES.mb(0),
        '--capacity-ml': SCALES.ml(0)
      }
    })

    return () => (
      <div
        class="fect-capacity"
        title={`${props.value}%`}
        style={{ ...setCssVariables.value, '--capacity-fill-width': addUnit(props.value, '%') }}
      >
        <span />
      </div>
    )
  }
})
