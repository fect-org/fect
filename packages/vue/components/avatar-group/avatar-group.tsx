import { defineComponent, computed } from 'vue'
import { createAvatarContext } from './avatar-context'
import { createName } from '../utils'
import { AvatarGroupProps } from './props'

import './index.less'

const name = createName('AvatarGroup')

export default defineComponent({
  name,
  props: AvatarGroupProps,
  setup(props, { slots }) {
    const showCount = computed(() => !!props.count)

    const { provider } = createAvatarContext()

    provider({ props })

    return () => (
      <div class="fect-avatar__group">
        {slots.default?.()}
        {showCount.value && <span class={'fect-avatar__counter'}>+{props.count}</span>}
      </div>
    )
  }
})
