import { watch, defineComponent, ref } from 'vue'
import { useState } from '@fect-ui/vue-hooks'
import { createName, createBem } from '../utils'
import { tabsProps } from './props'
import TabsTitle from './tabs-title'
import TabsHighlight from './tabs-highlight'
import { createTabsContext } from './tabs-context'

import './index.less'
import { getHighlightRect } from './style'
import type { TabsHighlightRect } from './interface'

const name = createName('Tabs')
const bem = createBem('fect-tabs')

export default defineComponent({
  name,
  props: tabsProps,
  emits: ['change', 'update:active', 'click'],
  setup(props, { slots, emit }) {
    const [checked, setChecked] = useState<string | number>(props.active)
    const [rect, setRect] = useState<TabsHighlightRect>()

    const headerRef = ref<HTMLHeadElement>()

    const [hoverable, setHoverable] = useState<boolean>(false)

    const { provider, children } = createTabsContext()
    provider({ props, checked })

    const tabClickHandler = (evt: Event, value: number | string, disabled: boolean) => {
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

    const tabMouseOverHandler = (e: MouseEvent) => {
      const tabEl = e.target as HTMLElement
      const rect = getHighlightRect(tabEl, headerRef.value)
      setRect(rect)

      setHoverable(true)
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
            onClick={(e: Event) => tabClickHandler(e, value, el.disabled)}
            onMouseenter={tabMouseOverHandler}
          />
        )
      })
    }

    return () => (
      <div class={bem(null)}>
        <header
          ref={headerRef}
          onMouseleave={() => setHoverable(false)}
          class={bem('header', { 'hide-divider': props.hideDivider })}
          role="tablist"
          aria-orientation="horizontal"
        >
          <TabsHighlight
            active={hoverable.value}
            rect={rect.value}
            widthRatio={props.hoverRatio.w}
            heightRatio={props.hoverRatio.h}
          />
          {renderNav()}
        </header>
        {slots.default?.()}
      </div>
    )
  }
})
