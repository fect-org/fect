import { watch, defineComponent } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { tabsProps } from './props'
import TabsTitle from './tabs-title'
import { createTabsContext } from './tabs-context'

import './index.less'

const name = createName('Tabs')
const bem = createBem('fect-tabs')

export default defineComponent({
  name,
  props: tabsProps,
  emits: ['change', 'update:active', 'click'],
  setup(props, { slots, emit }) {
    const [checked, setChecked] = useState<string | number>(props.active)

    const { provider, children } = createTabsContext()
    provider({ props, checked })

    const navClickHandler = (evt: Event, value: number | string, disabled: boolean) => {
      if (disabled) return
      setChecked(value)
      const selfEvent = {
        target: {
          checkValue: value
        },
        stopPropagation: evt.stopPropagation,
        preventDefault: evt.preventDefault,
        nativeEvent: evt
      }
      emit('update:active', value)
      emit('click', selfEvent)
    }

    watch(checked, (cur) => emit('change', cur))

    const renderNav = () => {
      return children.map((el, idx) => {
        const value = el.value || idx
        const active = checked.value === value
        return (
          <TabsTitle
            v-slots={{ label: el.$slots.label }}
            title={el.title}
            key={idx}
            active={active}
            disabled={el.disabled}
            onClick={(e: Event) => navClickHandler(e, value, el.disabled)}
          />
        )
      })
    }

    return () => (
      <div class="fect-tabs">
        <header
          class={bem('header', { 'hide-divider': props.hideDivider })}
          role="tablist"
          aria-orientation="horizontal"
        >
          {renderNav()}
        </header>
        {slots.default?.()}
      </div>
    )
  }
})
