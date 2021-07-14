import { computed } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import { SwipeProvide, READONLY_SWIPE_KEY } from '../swipe'
import './index.less'

const [createComponent] = createNameSpace('SwipeItem')

export default createComponent({
  props: {},
  setup(props, { attrs, slots, emit }) {
    const { context } = useProvider<SwipeProvide>(READONLY_SWIPE_KEY)

    return () => <div class="fect-swipe-item">{slots.default?.()}</div>
  },
})
