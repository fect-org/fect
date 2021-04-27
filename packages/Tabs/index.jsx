import { ref } from 'vue'
import { createNameSpace, createProvider } from '../utils'
import './tabs.less'
import TabsTitle from './tabs.title'

const [createComponent] = createNameSpace('Tabs')

const READONLY_TABS_KEY = 'tabsKey'

export default createComponent({
  props: {
    active: {
      type: [String, Number],
      default: 0,
    },
    hideDivider: Boolean,
  },
  emits: ['change', 'update:active'],
  setup(props, { attrs, slots, emit }) {
    const { provider, children } = createProvider(READONLY_TABS_KEY)
    provider(props)

    const setCurrent = (data) => {
      const { value } = data
      emit('update:active', value)
      // support emit change event
      emit('change', value)
    }

    const renderNav = () => {
      return children.map((el, idx) => (
        <TabsTitle
          title={el.title}
          value={el.value ? el.value : idx}
          key={idx}
          active={props.active}
          onClick={setCurrent}
        />
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
