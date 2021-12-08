import { PropType, computed, defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { Variable } from './type'
import ImageSkeleton from './image-skeleton'
import { READONLY_SKELETON_KEY, SkeletonProvide } from '../skeleton/skeleton'
import './index.less'

const name = createName('SkeletonItem')

export default defineComponent({
  name,
  props: {
    variable: {
      type: String as PropType<Variable>,
      default: 'text'
    }
  },
  setup(props) {
    const { context } = useProvider<SkeletonProvide>(READONLY_SKELETON_KEY)

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <SkeletonItem> must be a child component of <Skeleton>.')
      }
      return
    }

    const setStyle = computed(() => {
      const { animated } = context!
      const { variable } = props
      const names = []
      names.push(variable)
      animated && names.push('animated')
      return names.join(' ')
    })

    return () => (
      <div class={`fect-skeleton__item ${setStyle.value}`}>{props.variable === 'image' && <ImageSkeleton />}</div>
    )
  }
})
