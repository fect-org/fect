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
      <div class="fect-ava-group">
        {slots.default?.()}
        {showCount.value && (
          <span class={'fect-ava-counter'}>+{props.count}</span>
        )}
      </div>
    )
  },
})
