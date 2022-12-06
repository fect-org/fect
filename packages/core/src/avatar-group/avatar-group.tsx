import { defineComponent, computed } from 'vue'
import { createAvatarContext } from './avatar-context'
import { createName, createBem } from '../utils'
import { avatarGroupProps } from './props'

import './index.less'

const name = createName('AvatarGroup')
const bem = createBem('fect-avatar')

export default defineComponent({
  name,
  props: avatarGroupProps,
  setup(props, { slots }) {
    const showCount = computed(() => !!props.count)

    const { provider } = createAvatarContext()

    provider({ props })

    return () => (
      <div class={bem('group')}>
        {slots.default?.()}
        {showCount.value && <span class={bem('counter')}>+{props.count}</span>}
      </div>
    )
  }
})
