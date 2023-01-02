import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createBem, createName } from '../utils'
import { buttonGroupProps } from './props'
import { createButtonGroupContext } from './button-group-context'
import type { UIThemesPalette } from '../themes'
import type { RecordPartial, ButtonTypes } from '../utils'
import type { ButtonGroupProps } from './interface'

import './index.less'

const name = createName('ButtonGroup')
const bem = createBem('fect-button')

function getButtonGroupBorderColors(palette: UIThemesPalette, props: ButtonGroupProps) {
  const { type: userType = 'default', ghost } = props
  if (!ghost && userType !== 'default') return palette.background
  const colors: RecordPartial<ButtonTypes, string> = {
    default: palette.border,
    success: palette.success,
    secondary: palette.secondary,
    error: palette.error,
    warning: palette.warning
  }
  const type = userType.replace('-light', '') as ButtonTypes
  return colors[type] || (colors.default as string)
}

export default defineComponent({
  name,
  props: buttonGroupProps,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const scale = useScale()
    const { provider } = createButtonGroupContext()

    const border = computed(() => getButtonGroupBorderColors(theme.value.palette, props))

    const setCssVariabales = computed(() => {
      const { SCALES } = scale
      const { layout } = theme.value
      return {
        '--button-group-radius': layout.radius,
        '--button-group-border-color': border.value,
        '--button-group-width': SCALES.width(1, 'auto'),
        '--button-group-height': SCALES.height(1, 'min-content'),
        '--button-group-pt': SCALES.pt(0),
        '--button-group-pr': SCALES.pr(0),
        '--button-group-pb': SCALES.pb(0),
        '--button-group-pl': SCALES.pl(0),
        '--button-group-mt': SCALES.mt(0.313),
        '--button-group-mr': SCALES.mr(0.313),
        '--button-group-mb': SCALES.mb(0.313),
        '--button-group-ml': SCALES.ml(0.313)
      }
    })

    provider({ props })

    return () => (
      <div class={bem('group', props.vertical ? 'vertical' : 'horizontal')} style={setCssVariabales.value}>
        {slots.default?.()}
      </div>
    )
  }
})
