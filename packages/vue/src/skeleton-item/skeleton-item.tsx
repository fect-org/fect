import { PropType, computed, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
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
    const { context } = useSkeletonContext()

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <SkeletonItem> must be a child component of <Skeleton>.')
      }
      return
    }

    const setSkeletonItemClass = computed(() => {
      const { variable } = props
      const { animated } = context!
      return bem('item', { variable, animated: animated.value })
    })

    return () => <div class={setSkeletonItemClass.value}>{props.variable === 'image' && <ImageSkeleton />}</div>
  }
})
