import { watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName } from '../utils'
import { tabsProps } from './props'
import TabsTitle from './tabs-title'
import { createTabsContext } from './tabs-context'
import type { TabTitleEvent } from './interface'
import './index.less'

const name = createName('Tabs')

export default defineComponent({
  name,
  props: tabsProps,
  emits: ['change', 'update:active', 'click'],
  setup(props, { slots, emit }) {
    const [checked, setChecked] = useState<string | number>(props.active)

    const { provider, children } = createTabsContext()
    provider({ props, checked })

    const navClickHandler = (data: TabTitleEvent) => {
      const { value, e } = data
      setChecked(value)
      const selfEvent = {
        target: {
          checkValue: value
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e
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
          onClick={navClickHandler}
        />
      ))
    }

    return () => (
      <div class="fect-tabs">
        <header class={`fect-tabs__header ${props.hideDivider ? 'fect-tabs__header--hide-divider' : ''}`}>
          {renderNav()}
        </header>
        {slots.default?.()}
      </div>
    )
  }
})
