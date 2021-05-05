import { createNameSpace, createProvider } from '../utils'
import { ref, watch } from 'vue'
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
  emits: ['change', 'update:active', 'click'],
  setup(props, { attrs, slots, emit }) {
    const currentChecked = ref(props.active)
    const { provider, children } = createProvider(READONLY_TABS_KEY)
    provider({ props, currentChecked })

    const setCurrent = (data) => {
      const { value, e } = data
      currentChecked.value = value
      const selfEvent = {
        target: {
          checkValue: value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      emit('update:active', value)
      emit('click', selfEvent)
    }

    watch(currentChecked, (pre) => emit('change', pre))

    const renderNav = () => {
      return children.map((el, idx) => (
        <TabsTitle
          title={el.title}
          value={el.value ? el.value : idx}
          key={idx}
          active={currentChecked.value}
          onClick={setCurrent}
        />
      ))
    }

    return () => (
      <div class="fect-tabs_container">
        <header
          class={`tabs_header ${props.hideDivider ? 'hide-divider' : ''}`}
        >
          {renderNav()}
        </header>
        {slots.default?.()}
      </div>
    )
  },
})
