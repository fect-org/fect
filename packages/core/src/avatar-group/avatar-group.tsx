import { defineComponent, computed } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem } from '../utils'

import './index.less'

const name = createName('AvatarGroup')
const bem = createBem('fect-avatar')

export default defineComponent({
  name,
  props: {
    count: [String, Number]
  },
  setup(props, { slots }) {
    const scale = useScale()
    const { theme } = useTheme()
    const showCount = computed(() => !!props.count)

    const getCssVaribales = computed(() => {
      const { SCALES } = scale
      return {
        '--avatar-group-width': SCALES.width(1, 'max-content'),
        '--avatar-group-height': SCALES.height(1, 'auto'),
        '--avatar-group-pt': SCALES.pt(0),
        '--avatar-group-pr': SCALES.pr(0),
        '--avatar-group-pb': SCALES.pb(0),
        '--avatar-group-pl': SCALES.pl(0),
        '--avatar-group-mt': SCALES.mt(0),
        '--avatar-group-mr': SCALES.mr(0),
        '--avatar-group-mb': SCALES.mb(0),
        '--avatar-group-ml': SCALES.ml(0),
        '--avatar-group-font-size': SCALES.font(0.875),
        '--avatar-group-count-color': theme.value.palette.accents_7
      }
    })

    return () => (
      <div class={bem('group')} style={getCssVaribales.value}>
        {slots.default?.()}
        {showCount.value && <span class={bem('counter')}>+{props.count}</span>}
      </div>
    )
  }
})
