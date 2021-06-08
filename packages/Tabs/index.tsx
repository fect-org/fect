import { ref, watch, Ref } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createNameSpace } from '../utils'
import { ComponentInstance } from '../utils/base'
import TabsTitle, { TabTitleEmit } from './tabs-title'
import './tabs.less'
const [createComponent] = createNameSpace('Tabs')

export const READONLY_TABS_KEY = 'tabsKey'

export type TabsProvide = {
  props: {
    active: string | number
    hideDivider: boolean
  }
  currentChecked: Ref<string | number>
}

export default createComponent({
  props: {
    active: {
      type: [String, Number],
      default: 0,
    },
    hideDivider: Boolean,
  },
  emits: ['change', 'update:active', 'click'],
  setup(props, { slots, emit }) {
    const currentChecked = ref<string | number>(props.active)

    const { provider, children } = createProvider<ComponentInstance>(
      READONLY_TABS_KEY,
    )
    provider({ props, currentChecked })

    const setCurrent = (data: TabTitleEmit) => {
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
          value={el.value || idx}
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
