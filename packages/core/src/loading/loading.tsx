import { computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { isArray, make } from '@fect-ui/shared'
import { useTheme } from '../composables'
import { createName, createBem, withClassName } from '../utils'
import { props } from './props'
import LoadingCircle from './loading-circle'
import type { UIThemesPalette } from '../themes'
import type { NormalTypes } from '../utils'

import './index.less'

const name = createName('Loading')
const bem = createBem('fect-loading')

function getLoadingColors(palette: UIThemesPalette, type: NormalTypes) {
  const colors: Record<string, string> = {
    default: palette.accents_6,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error
  }
  return colors[type]
}

export default defineComponent({
  name,
  props,
  setup(props) {
    const { theme } = useTheme()
    const { SCALES } = useScale()

    const setLoadingStyles = computed(() => {
      const { color, loadType } = props
      if (!color) return
      /**
       * When loadType equal circle , we can't give it any color.
       * Because LoadingCricle component is svg. So we only do this. :)
       */
      const beArrColor = isArray(color)

      if (loadType === 'circle')
        return {
          color: beArrColor ? 'initial' : color
        }
      return {
        background: beArrColor ? `linear-gradient(${color.join()})` : color
      }
    })

    /**
     * follow variable is loading type should fill element count.
     */
    const wave = 5
    const cube = 4
    const normal = 3

    const setLoadClasses = computed(() => withClassName(bem(props.loadType, props.type), props.type))

    const baseStyle = computed(() => {
      return {
        '--loading-bg-color': getLoadingColors(theme.value.palette, props.type)
      }
    })

    const loadTypeScaleale = computed(() => {
      const { loadType } = props
      if (loadType === 'circle') return SCALES.font(1.25)
      return SCALES.font(0.25)
    })

    const setCssVariables = computed(() => {
      return {
        ...baseStyle.value,
        '--loading-width': SCALES.width(1, '100%'),
        '--loading-height': SCALES.height(1, '100%'),
        '--loading-font-size': loadTypeScaleale.value,
        '--loading-pt': SCALES.pt(0),
        '--loading-pr': SCALES.pr(0),
        '--loading-pb': SCALES.pb(0),
        '--loading-pl': SCALES.pl(0),
        '--loading-mt': SCALES.mt(0),
        '--loading-mr': SCALES.mr(0),
        '--loading-mb': SCALES.mb(0),
        '--loading-ml': SCALES.ml(0)
      }
    })

    const getLoadNum = computed(() => {
      const { loadType } = props
      if (loadType === 'circle') return null
      const loader = { wave, default: normal, cube }
      return loader[loadType] || loader.default
    })

    return () => (
      <div class={bem(null)} style={setCssVariables.value}>
        <span class={bem('wrapper')}>
          {getLoadNum.value ? (
            make(getLoadNum.value).map((_, i) => (
              <i class={setLoadClasses.value} style={setLoadingStyles.value} key={i} />
            ))
          ) : (
            <LoadingCircle class={setLoadClasses.value} style={setLoadingStyles.value} />
          )}
        </span>
      </div>
    )
  }
})
