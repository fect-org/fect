import { computed, defineComponent } from 'vue'
import { createName, createBem, isDEV } from '../utils'
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
      if (isDEV) console.error('[Fect] <Tab> must be a child component of <Tabs>.')
      return
    }

    const shouldRender = computed(() => {
      // it will use index of components while value is empty
      const selfValue = props.value || idx
      if (context.checked.value === selfValue) return true
      return false
    })

    /**
     * we should sue v-if replace v-show,
     * because we found when we use custom slot, it will not reRender.
     * and v-show will immediately calculate and cause some elements that need dynamic height to fail
     */

    return () =>
      shouldRender.value && (
        <div class={bem(null)} role="tabpanel" tabindex={shouldRender.value ? 0 : -1}>
          {slots.default?.()}
        </div>
      )
  }
})
