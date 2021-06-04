import { computed, watchEffect, ref } from 'vue'
import { createNameSpace, useProvider } from '../utils'
import { TabsProvide, READONLY_TABS_KEY } from '../Tabs/index'
import './tab.less'
const [createComponent] = createNameSpace('Tab')

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
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const { context, idx } = useProvider<TabsProvide>(READONLY_TABS_KEY)
    const selfIndex = ref<string | number>(props.value)
    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Fect] <Tab> must be a child component of <Tabs>.')
      }
      return
    }
    /**
     * it will  use index of components while value is empty
     */
    watchEffect(() => {
      if (selfIndex.value === '') return (selfIndex.value = idx)
    })
    const isDisabled = computed(() => {
      return context.currentChecked.value === selfIndex.value ? '' : 'none'
    })

    return () => (
      <div class={`fect-tab_wrapper ${isDisabled.value}`}>
        {slots.default?.()}
      </div>
    )
  },
})
