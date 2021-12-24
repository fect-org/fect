import { computed, watchEffect, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { useTabsContext } from '../tabs/tabs-context'
import { tabProps } from '../tabs/props'
import './index.less'
const name = createName('Tab')

export default defineComponent({
  name,
  props: tabProps,
  setup(props, { slots }) {
    const { context, idx } = useTabsContext()
    const [selfValue, setSelfValue] = useState<string | number>(props.value)
    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <Tab> must be a child component of <Tabs>.')
      }
      return
    }
    /**
     * it will  use index of components while value is empty
     */
    watchEffect(() => !selfValue.value && setSelfValue(idx))
    const setHidden = computed(() => {
      const checked = context.checked.value === selfValue.value
      return checked ? '' : 'none'
    })

    return () => <div class={`fect-tab ${setHidden.value}`}>{slots.default?.()}</div>
  }
})
