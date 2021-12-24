import { defineComponent, computed } from 'vue'
import { tabsTitleProps } from './props'

const TabsTitle = defineComponent({
  props: tabsTitleProps,
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (e: Event) => {
      const { title, value } = props
      if (props.disabled) return
      emit('click', { title, value, e })
    }

    const setTitleStatus = computed(() => {
      const { value, disabled, active } = props
      const names: string[] = []
      value === active && names.push('active')
      disabled && names.push('disabled')
      return names.join(' ')
    })

    return () => (
      <div role="button" class={`fect-tabs__title ${setTitleStatus.value}`} onClick={(e) => handleClick(e)}>
        {props.title}
      </div>
    )
  }
})

export default TabsTitle
