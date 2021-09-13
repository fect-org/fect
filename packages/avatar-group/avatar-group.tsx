import { defineComponent, computed } from 'vue'
import { createName } from '../utils'

import './index.less'

const name = createName('AvatarGroup')

export default defineComponent({
  name,
  props: {
    count: [String, Number],
  },
  setup(props, { slots }) {
    const showCount = computed(() => !!props.count)

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
