import { computed, PropType, defineComponent } from 'vue'
import { isNumber, noop, len } from '@fect-ui/shared'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../composables'
import { createName, createBem, addUnit } from '../utils'
import type { NormalTypes } from '../utils'
import type { UIThemesPalette } from '../themes'
import './index.less'

export type ProgressTyeps = NormalTypes

const name = createName('Progress')

const bem = createBem('fect-progress')

const getProgressBgColor = (
  ratio: number,
  colors: Record<string | number, string> = {},
  type: ProgressTyeps,
  palette: UIThemesPalette
) => {
  const preset: Record<ProgressTyeps, string> = {
    default: palette.foreground,
    success: palette.success,
    secondary: palette.secondary,
    warning: palette.warning,
    error: palette.error
  }
  if (!colors) return preset.default
  const colorkeys = Object.keys(colors)
  if (!len(colorkeys)) return preset[type]
  const customColor = colorkeys.find((key) => ratio <= +key)
  if (!customColor) return preset[type]
  return colors[+customColor]
}

const getProportions = (value: number, maxValue: number) => {
  const val = value / maxValue
  const rightValue = isNumber(val) ? val * 100 : 0
  if (rightValue > 100) return 100
  if (rightValue < 0) return 0
  return +rightValue.toFixed(2)
}

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    colors: {
      type: Object,
      default: noop
    },
    type: {
      type: String as PropType<ProgressTyeps>,
      default: 'default'
    },
    fixedTop: Boolean,
    fixedBottom: Boolean
  },

  setup(props, { attrs }) {
    const { SCALES } = useScale()
    const { theme } = useTheme()

    const baseStyle = computed(() => {
      const { colors, value, max, type } = props
      const percent = getProportions(value, max)
      const color = getProgressBgColor(percent, colors, type, theme.value.palette)
      return {
        '--progress-radius': theme.value.layout.radius,
        '--progress-bg-color': theme.value.palette.accents_2,
        '--progress-inner-width': addUnit(percent, '%'),
        '--progress-inner-bg-color': color,
        '--progress-fixed-bottom': props.fixedBottom ? 0 : 'unset',
        '--progress-fixed-top': props.fixedTop ? 0 : 'unset'
      }
    })

    const setCssVariables = computed(() => {
      return {
        ...baseStyle.value,
        '--progress-width': SCALES.width(1, '100%'),
        '--progress-height': SCALES.height(0.625),
        '--progress-pt': SCALES.pt(0),
        '--progress-pr': SCALES.pr(0),
        '--progress-pb': SCALES.pb(0),
        '--progress-pl': SCALES.pl(0),
        '--progress-mt': SCALES.mt(0),
        '--progress-mr': SCALES.mr(0),
        '--progress-mb': SCALES.mb(0),
        '--progress-ml': SCALES.ml(0)
      }
    })

    return () => (
      <div class={bem(null, { fixed: props.fixedTop || props.fixedBottom })} style={setCssVariables.value}>
        <div class={bem('inner', props.type)} title={`${getProportions(props.value, props.max)}%`} {...attrs}></div>
        <progress value={props.value} max={props.max}></progress>
      </div>
    )
  }
})
