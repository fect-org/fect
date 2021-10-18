import { defineComponent, computed } from 'vue'

export type TabTitleEmit = {
  title: string
  value: string | number
  e: MouseEvent
}

const TabsTitle = defineComponent({
  props: {
    title: String,
    value: {
      type: [String, Number],
    },
    active: [String, Number],
    disabled: Boolean,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (e: MouseEvent) => {
      const { title, value } = props
      // when tab has disabled attrs,event is not allowed
      if (props.disabled) return
      emit('click', { title, value, e } as TabTitleEmit)
    }

    const setTitleStatus = computed(() => {
      const { value, disabled, active } = props
      const names: string[] = []
      value === active && names.push('active')
      disabled && names.push('disabled')
      return names.join(' ')
    })

    return () => (
      <div role="tab" class={`fect-tabs__title ${setTitleStatus.value}`} onClick={(e) => handleClick(e)}>
        {props.title}
      </div>
    )
  },
})

export default TabsTitle
