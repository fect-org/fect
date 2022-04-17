import { computed, CSSProperties, PropType, defineComponent, ComputedRef } from 'vue'
import { createName, NormalTypes, createBem, isNumber, noop } from '../utils'
import './index.less'

const name = createName('Progress')

const bem = createBem('fect-progress')

const getProgressBgColor = (ratio: number, colors: Record<string | number, string>) => {
  const colorkeys = Object.keys(colors)
  if (!colorkeys.length) return ''
  const customColor = colorkeys.find((key) => ratio <= +key)
  if (!customColor) return ''
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
      type: String as PropType<NormalTypes>,
      default: 'default'
    }
  },

  setup(props, { attrs }) {
    const setStyle: ComputedRef<CSSProperties> = computed(() => {
      const { colors, value, max } = props
      const percent = getProportions(value, max)
      const color = getProgressBgColor(percent, colors || {})
      return {
        backgroundColor: color,
        width: `${percent}%`
      }
    })

    return () => (
      <div class={bem(null)}>
        <div
          class={bem('inner', props.type)}
          title={`${getProportions(props.value, props.max)}%`}
          style={setStyle.value}
          {...attrs}
        ></div>
        <progress value={props.value} max={props.max}></progress>
      </div>
    )
  }
})
