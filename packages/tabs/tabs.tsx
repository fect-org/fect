import { watch, Ref, defineComponent } from 'vue'
import { createProvider } from '@fect-ui/vue-hooks'
import { createName, useState } from '../utils'
import { ComponentInstance } from '../utils/base'
import TabsTitle, { TabTitleEmit } from './tabs-title'
import './index.less'
const name = createName('Tabs')

export const READONLY_TABS_KEY = 'tabsKey'

export type TabsProvide = {
  props: {
    active: string | number
    hideDivider: boolean
  }
  checked: Ref<string | number>
}

export default defineComponent({
  name,
  props: {
    active: {
      type: [String, Number],
      default: 0,
    },
    hideDivider: Boolean,
  },
  emits: ['change', 'update:active', 'click'],
  setup(props, { slots, emit }) {
    const [checked, setChecked] = useState<string | number>(props.active)

    const { provider, children } = createProvider<ComponentInstance>(
      READONLY_TABS_KEY,
    )
    provider({ props, checked })

    const setCurrent = (data: TabTitleEmit) => {
      const { value, e } = data
      setChecked(value)
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

    watch(checked, (cur) => emit('change', cur))

    const renderNav = () => {
      return children.map((el, idx) => (
        <TabsTitle
          title={el.title}
          value={el.value || idx}
          key={idx}
          active={checked.value}
          disabled={el.disabled}
          onClick={setCurrent}
        />
      ))
    }

    return () => (
      <div class="fect-tabs">
        <header
          class={`fect-tabs__header  fect-tabs__header--${
            props.hideDivider ? 'hide-divider' : ''
          }`}
        >
          {renderNav()}
        </header>
        {slots.default?.()}
      </div>
    )
  },
})
