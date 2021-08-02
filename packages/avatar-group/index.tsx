import { ref } from 'vue'
import { createNameSpace } from '../utils'

const [createComponent] = createNameSpace('AvatarGroup')

import './index.less'

export default createComponent({
  props: {
    count: [String, Number],
  },
  setup(props, { slots }) {
    const showCount = ref<boolean>(!!props.count)

    return () => (
      <div class="fect-avatar__group">
        {slots.default?.()}
        {showCount.value && (
          <span class={'fect-avatar__counter'}>+{props.count}</span>
        )}
      </div>
    )
  },
})
