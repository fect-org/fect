import { toRefs } from 'vue'
import { createNameSpace } from '../utils'

const [createComponent] = createNameSpace('AvatarGroup')

import './avatar.group.less'

export default createComponent({
  props: {
    count: [String, Number],
  },
  setup(props, { attrs, slots }) {
    const { count } = toRefs(props)
    const showCount = !!(count && count.value)
    console.log(showCount)
    return () => (
      <>
        <div
          className={`fay-ava-group ${(attrs.class ? attrs.class : '').trim()}`}
          style={attrs.style}
        >
          {slots && slots.default()}
          {showCount && (
            <span className={'fay-ava-counter'}>+{count.value}</span>
          )}
        </div>
      </>
    )
  },
})
