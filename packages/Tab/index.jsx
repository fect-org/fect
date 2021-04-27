import { createNameSpace, useProvider } from '../utils'
import { computed } from 'vue'
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
    const { ctx } = useProvider(READONLY_TABS_KEY)
    const isDisabled = computed(() => {
      return ctx.currentChecked.value === props.value ? '' : 'none'
    })

    return () => (
      <>
        <div class={`fect-tab_wrapper ${isDisabled.value}`}>
          {slots.default?.()}
        </div>
      </>
    )
  },
})
