import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../provider/theme-context'
import { createName, createBem, withClassName } from '../utils'
import { useBadgeContext } from '../badge-anchor/badge-context'
import type { CSSProperties, PropType } from 'vue'
import type { NormalTypes } from '../utils'
import type { UIThemesPalette } from '../themes'

import './index.less'

export type BadgeTypes = NormalTypes

const name = createName('Badge')

const bem = createBem('fect-badge')

function getBadgeColors(palette: UIThemesPalette, type: BadgeTypes) {
  const colors: Record<BadgeTypes, string> = {
    default: palette.foreground,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error
  }
  if (!type || type === 'default') {
    return {
      color: palette.background,
      bgColor: colors.default
    }
  }
  return {
    color: 'white',
    bgColor: colors[type]
  }
}

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<BadgeTypes>,
      default: 'default'
    },
    dot: Boolean
  },
  setup(props, { slots, attrs }) {
    const { SCALES } = useScale()
    const { theme } = useTheme()
    const { context } = useBadgeContext()

    const colors = computed(() => getBadgeColors(theme.value.palette, props.type))

    const getPlacementWithBadgeAnchor = computed<CSSProperties>(() => {
      if (!context) return {}
      const { top, left, right, value, origin, bottom } = context.transform.value
      return {
        position: 'absolute',
        top: `${top || 'auto'}`,
        left: `${left || 'auto'}`,
        right: `${right || 'auto'}`,
        bottom: `${bottom || 'auto'}`,
        transform: `${value}`,
        transformOrigin: `${origin}`,
        zIndex: 1
      }
    })

    const setCssVariables = computed(() => {
      const { color, bgColor } = colors.value
      return {
        '--badge-color': color,
        '--badge-bg-color': bgColor,
        '--badge-font-size': SCALES.font(0.875),
        '--badge-width': SCALES.width(1, 'auto'),
        '--badge-height': SCALES.height(1, 'auto'),
        '--badge-pt': SCALES.pt(0.25),
        '--badge-pr': SCALES.pr(0.4375),
        '--badge-pb': SCALES.pb(0.25),
        '--badge-pl': SCALES.pl(0.4375),
        '--badge-mt': SCALES.mt(0),
        '--badge-mr': SCALES.mr(0),
        '--badge-mb': SCALES.mb(0),
        '--badge-ml': SCALES.ml(0),
        '--badge-dot-px': SCALES.px(0.25),
        '--badge-dot-py': SCALES.py(0.25)
      }
    })

    const renderElement = () => {
      if (props.dot)
        return <span class={withClassName(bem(null, props.type), 'dot')} style={setCssVariables.value} {...attrs} />
      return (
        <span class={bem(null, props.type)} style={setCssVariables.value} {...attrs}>
          {slots.default?.()}
        </span>
      )
    }
    return () => {
      if (context) return <sup style={getPlacementWithBadgeAnchor.value}>{renderElement()}</sup>
      return renderElement()
    }
  }
})
