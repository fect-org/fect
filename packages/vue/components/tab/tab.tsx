import { computed, defineComponent } from 'vue'
import { createName, createBem } from '../utils'
import { useTabsContext } from '../tabs/tabs-context'
import { tabProps } from '../tabs/props'
import './index.less'

const name = createName('Tab')
const bem = createBem('fect-tab')

export default defineComponent({
  name,
  props: tabProps,
  setup(props, { slots }) {
    const { context, idx } = useTabsContext()

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <Tab> must be a child component of <Tabs>.')
      }
      return
    }

    const shouldRender = computed(() => {
      // it will use index of components while value is empty
      const selfValue = props.value || idx
      if (context.checked.value === selfValue) return true
      return false
    })

    return () => (
      <div class={bem(null)} v-show={shouldRender.value} role="tabpanel" tabindex={shouldRender.value ? 0 : -1}>
        {slots.default?.()}
      </div>
    )
  }
})
