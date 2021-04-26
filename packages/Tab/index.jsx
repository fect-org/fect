import { computed, toRefs } from 'vue'
import { createNameSpace, useProvider } from '../utils'
import './tab.less'

const [createComponent] = createNameSpace('Tab')

const READONLY_TABS_KEY = 'tabsKey'

export default createComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { attrs, slots, emit }) {
    const { ctx, idx } = useProvider(READONLY_TABS_KEY)
    console.log(idx)
    return () => (
      <>
        <div class="fect-tab_wrapper">{slots.default?.()}</div>
      </>
    )
  },
})
