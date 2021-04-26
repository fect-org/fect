import { computed, onMounted, getCurrentInstance, nextTick } from 'vue'
import { createNameSpace, createProvider } from '../utils'
import './tabs.less'
import TabsTitle from './tabs.title'

const [createComponent] = createNameSpace('Tabs')

const READONLY_TABS_KEY = 'tabsKey'

export default createComponent({
  props: {
    active: {
      type: [String, Number],
      default: '',
    },
    hideDivider: Boolean,
  },
  emits: ['change', 'update:active'],
  setup(props, { attrs, slots, emit }) {
    const { provider, children } = createProvider(READONLY_TABS_KEY)
    provider(props)
    const renderNav = () => {
      return children.map((el, idx) => (
        <TabsTitle title={el.title} value={el.value} key={idx} />
      ))
    }

    return () => (
      <>
        <div class="fect-tabs_container">
          <header
            class={`tabs_header ${props.hideDivider ? 'hide-divider' : ''}`}
          >
            {renderNav()}
          </header>
          <div>{slots.default?.()}</div>
        </div>
      </>
    )
  },
})
