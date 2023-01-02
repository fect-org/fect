import { PropType, computed, defineComponent } from 'vue'
import { useScale } from '@fect-ui/scale'
import { useTheme } from '../composables'
import { createName, createBem, isDEV } from '../utils'
import ImageSkeleton from './image-skeleton'
import { useSkeletonContext } from '../skeleton/skeleton-context'

import type { Variable } from '../skeleton/interface'

import './index.less'

const name = createName('SkeletonItem')

const bem = createBem('fect-skeleton')

export default defineComponent({
  name,
  props: {
    variable: {
      type: String as PropType<Variable>,
      default: 'text'
    }
  },
  setup(props) {
    const { SCALES } = useScale()
    const { theme } = useTheme()
    const { context } = useSkeletonContext()

    if (!context) {
      if (isDEV) console.error('[Fect] <SkeletonItem> must be a child component of <Skeleton>.')
      return
    }

    const baseStyle = computed(() => {
      const { palette, layout } = theme.value
      return {
        '--skeleton-bg-color': palette.accents_2,
        '--skeleton-image-color': palette.accents_3,
        '--skeleton-radius': layout.radius,
        '--skeleton-animation-linear': `270deg,${palette.accents_1},${palette.accents_2},${palette.accents_2},${palette.accents_1}`
      }
    })

    const setCssVariables = computed(() => {
      return {
        ...baseStyle.value,
        '--skeleton-width': SCALES.width(1, '100%'),
        '--skeleton-caption-height': SCALES.height(0.75),
        '--skeleton-text-height': SCALES.height(0.8125),
        '--skeleton-rect-height': SCALES.height(1),
        '--skeleton-image-height': SCALES.height(1),
        '--skeleton-h1-height': SCALES.height(1.25),
        '--skeleton-h3-height': SCALES.height(1.125),
        '--skeleton-circle-size': SCALES.height(1.75),
        '--skeleton-button-height': SCALES.height(2.5),
        '--skeleton-button-width': SCALES.width(10.5),
        '--skeleton-mt': SCALES.mt(0.3125),
        '--skeleton-mr': SCALES.mr(0),
        '--skeleton-mb': SCALES.mb(0.3125),
        '--skeleton-ml': SCALES.ml(0)
      }
    })

    return () => (
      <div
        class={bem('item', { variable: props.variable, animated: context.animated.value })}
        style={setCssVariables.value}
      >
        {props.variable === 'image' && <ImageSkeleton />}
      </div>
    )
  }
})
