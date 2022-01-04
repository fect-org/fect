import { computed, CSSProperties, PropType, defineComponent } from 'vue'
import { createName, NormalTypes } from '../utils'
import './index.less'

interface ProgressColros {
  [prop: number]: string
}

const name = createName('Progress')

const queryColors = (ratio: number, type: NormalTypes, colors: ProgressColros) => {
  const defaultColors: { [key in NormalTypes]: string } = {
    default: 'var(--primary-foreground)',
    success: 'var(--success-default)',
    warning: 'var(--warning-default)',
    error: 'var(--error-default)'
  }
  const colorkeys = Object.keys(colors)
  if (colorkeys.length === 0) return defaultColors[type]
  const customColor = colorkeys.find((key) => ratio <= +key)
  if (!customColor) return defaultColors[type]
  return colors[+customColor]
}

const queryProportions = (value: number, maxValue: number) => {
  /**
   * In practice, the user may pass in a string.
   */
  const val = value / maxValue
  const rightValue = (Number.isNaN(val) ? 0 : val) * 100
  if (rightValue > 100) return 100
  if (rightValue < 0) return 0
  return rightValue.toFixed(2)
}

export default defineComponent({
  name,
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
      default: () => ({})
    },
    type: {
      type: String as PropType<NormalTypes>,
      default: 'default'
    }
  },

  setup(props, { attrs }) {
    const setPercentValue = computed(() => `${queryProportions(props.value, props.max)}%`)

    const setStyle = computed(() => {
      const { type, colors } = props
      const color = queryColors(queryProportions(props.value, props.max) as number, type, colors || {})
      return {
        backgroundColor: color,
        width: setPercentValue.value
      } as CSSProperties
    })

    return () => (
      <div class="fect-progress">
        <div class="fect-progress__inner" title={setPercentValue.value} style={setStyle.value} {...attrs}></div>
        <progress value={props.value} max={props.max}></progress>
      </div>
    )
  }
})
