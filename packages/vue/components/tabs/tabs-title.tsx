import { defineComponent, computed } from 'vue'
import { createBem } from '../utils'
import { tabsTitleProps } from './props'

const bem = createBem('fect-tabs')

const TabsTitle = defineComponent({
  props: tabsTitleProps,
  emits: ['click'],
  setup(props, { emit, slots }) {
    const setTabTitleClass = computed(() => {
      const { disabled, active } = props
      return bem('title', { disabled, active })
    })

    return () => (
      <div role="tab" class={setTabTitleClass.value} onClick={(e: Event) => emit('click', e)}>
        {slots.label ? slots.label() : props.title}
      </div>
    )
  }
})

export default TabsTitle
