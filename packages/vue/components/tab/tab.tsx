import { computed, watchEffect, defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { createName, useState } from '../utils'
import { TabsProvide, READONLY_TABS_KEY } from '../tabs/tabs'
import './index.less'
const name = createName('Tab')

export default defineComponent({
  name,
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const { context, idx } = useProvider<TabsProvide>(READONLY_TABS_KEY)
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
  },
})
