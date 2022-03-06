import { defineComponent, computed } from 'vue'
import { createBem } from '../utils'
import { tabsTitleProps } from './props'

const bem = createBem('fect-tabs')

const TabsTitle = defineComponent({
  props: tabsTitleProps,
  emits: ['click', 'mouseenter'],
  setup(props, { emit, slots }) {
    const setTabTitleClass = computed(() => {
      const { disabled, active, hideBorder } = props
      return bem('title', { disabled, active, 'hide-border': hideBorder })
    })

    return () => (
      <div
        role="tab"
        class={setTabTitleClass.value}
        onMouseenter={(e: MouseEvent) => emit('mouseenter', e)}
        onClick={(e: Event) => emit('click', e)}
      >
        {slots.label ? slots.label() : props.title}
      </div>
    )
  }
})

export default TabsTitle
