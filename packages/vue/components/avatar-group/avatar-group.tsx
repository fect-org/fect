import { defineComponent, computed } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { AvatarGroupProps } from './props'
import { READONLY_AVATAR_KEY } from './type'

import './index.less'

const name = createName('AvatarGroup')

export default defineComponent({
  name,
  props: AvatarGroupProps,
  setup(props, { slots }) {
    const showCount = computed(() => !!props.count)

    const { provider } = createProvider(READONLY_AVATAR_KEY)

    provider({ props })

    return () => (
      <div class="fect-avatar__group">
        {slots.default?.()}
        {showCount.value && <span class={'fect-avatar__counter'}>+{props.count}</span>}
      </div>
    )
  }
})
