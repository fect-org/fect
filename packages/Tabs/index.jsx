import { createNameSpace, createProvider } from '../utils'
import { ref } from 'vue'
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
    const currentChecked = ref(props.active)
    const { provider, children } = createProvider(READONLY_TABS_KEY)
    provider({ props, currentChecked })

    const setCurrent = (data) => {
      const { value } = data
      emit('update:active', value)
      currentChecked.value = value
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
          {slots.default?.()}
        </div>
      </>
    )
  },
})
