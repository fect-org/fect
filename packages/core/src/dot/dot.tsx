import { PropType, defineComponent, computed } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem } from '../utils'
import type { NormalTypes } from '../utils'
import type { UIThemes } from '../themes'

import './index.less'

const name = createName('Dot')
const bem = createBem('fect-dot')

export type DotTypes = NormalTypes

const getColor = (type: DotTypes, theme: UIThemes) => {
  const colors: { [key in DotTypes]?: string } = {
    default: theme.palette.accents_2,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error
  }
  return colors[type] || (colors.default as string)
}

export default defineComponent({
  name,
  props: {
    type: {
      type: String as PropType<DotTypes>,
      default: 'default'
    }
  },
  setup(props, { slots }) {
    const scale = useScale()
    const { theme } = useTheme()

    const color = computed(() => getColor(props.type, theme.value))

    const getCssVariables = computed(() => {
      const { SCALES } = scale
      return {
        '--dot-font-size': SCALES.font(1),
        '--dot-width': SCALES.width(1, 'auto'),
        '--dot-height': SCALES.height(1, 'auto'),
        '--dot-pt': SCALES.pt(0),
        '--dot-pr': SCALES.pr(0),
        '--dot-pb': SCALES.pb(0),
        '--dot-pl': SCALES.pl(0),
        '--dot-mt': SCALES.mt(0),
        '--dot-mr': SCALES.mr(0),
        '--dot-mb': SCALES.mb(0),
        '--dot-ml': SCALES.ml(0),
        '--dot-color': color.value
      }
    })

    return () => (
      <div class={bem(null)} style={getCssVariables.value}>
        <span class={bem('circle', props.type)}></span>
        <span class={bem('ctx')}>{slots.default?.()}</span>
      </div>
    )
  }
})
