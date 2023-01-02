import { computed, defineComponent, onMounted } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { useScale } from '@fect-ui/scale'
import { isNumber, assign } from '@fect-ui/shared'
import { useTheme } from '../composables'
import { createName } from '../utils'
import Skeleton from '../skeleton'
import SkeletonItem from '../skeleton-item'
import './index.less'

const name = createName('Image')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: ''
    },
    skeleton: Boolean,
    maxDelay: {
      type: [String, Number],
      default: 3000
    }
    // width: {
    //   type: [Number, String],
    //   default: 'auto'
    // },
    // height: {
    //   type: [Number, String],
    //   default: 'auto'
    // }
  },
  setup(props, { attrs }) {
    const { theme } = useTheme()
    const { SCALES, getScaleableProps } = useScale()
    const [loading, setLoading] = useState<boolean>(true)
    const width = getScaleableProps<string | number | undefined>(['width', 'w'])
    const height = getScaleableProps<string | number | undefined>(['height', 'h'])
    onMounted(() => {
      const { maxDelay, skeleton } = props
      // user may pass  a non-number. In order to avoid program errors, we need to give a default value.
      const delay = isNumber(maxDelay) ? Number(maxDelay) : 3000
      let timer: number | undefined
      timer && window.clearTimeout(timer)
      if (skeleton) {
        setLoading(false)
        timer = window.setTimeout(() => {
          setLoading(true)
          window.clearTimeout(timer)
        }, delay)
      }
    })

    const baseStyle = computed(() => {
      const { layout } = theme.value
      return {
        '--image-radius': layout.radius
      }
    })

    const setCssVaariables = computed(() => {
      return {
        ...baseStyle.value,
        '--image-width': SCALES.width(1, 'auto'),
        '--image-height': SCALES.height(1, 'auto'),
        '--image-pt': SCALES.pt(0),
        '--image-pr': SCALES.pr(0),
        '--image-pb': SCALES.pb(0),
        '--image-pl': SCALES.pl(0),
        '--image-mt': SCALES.mt(0),
        '--image-mr': SCALES.mr(0),
        '--image-mb': SCALES.mb(0),
        '--image-ml': SCALES.ml(0)
      }
    })

    const slots = {
      default: () => <img src={props.src} {...attrs} />,
      skeleton: () => <SkeletonItem variable="image" w={width.value} h={height.value} />
    }

    return () => (
      <div class="fect-image" style={setCssVaariables.value}>
        <Skeleton loading={loading.value} v-slots={slots}></Skeleton>
      </div>
    )
  }
})
