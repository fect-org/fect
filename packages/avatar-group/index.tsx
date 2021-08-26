
import { createNameSpace ,useState } from '../utils'

const [createComponent] = createNameSpace('AvatarGroup')

import './index.less'

export default createComponent({
  props: {
    count: [String, Number],
  },
  setup(props, { slots }) {
    const [showCount] = useState<boolean>(!!props.count)

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
