import { PropType } from 'vue'
import { createNameSpace } from '../utils'
import { Variable } from './type'
import ImageSkeleton from './image-skeleton'

const [createComponent] = createNameSpace('SkeletonItem')

export default createComponent({
  props: {
    variable: {
      type: String as PropType<Variable>,
      default: 'text',
    },
  },
  setup(props) {
    return () => (
      <div class={`fect-skeleton__item ${props.variable}`}>
        {props.variable === 'image' && <ImageSkeleton />}
      </div>
    )
  },
})
