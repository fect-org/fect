import { toRefs } from 'vue'
import { createNameSpace } from '../utils'

const [createComponent] = createNameSpace('AvatarGroup')

import './avatarGroup.less'

export default createComponent({
  props: {
    count: [String, Number],
  },
  setup(props, { attrs, slots }) {
    const { count } = toRefs(props)
    const showCount = !!(count && count.value)

    return () => (
      <>
        <div
          {...attrs}
          className={`fect-ava-group ${(attrs.class
            ? attrs.class
            : ''
          ).trim()}`}
          style={attrs.style}
        >
          {slots.default?.()}
          {showCount && (
            <span className={'fect-ava-counter'}>+{count.value}</span>
          )}
        </div>
      </>
    )
  },
})
