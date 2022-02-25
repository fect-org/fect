import { defineComponent, computed } from 'vue'
import { useSelectContext } from '../select/select-context'
import { selectOptionProps } from '../select/props'
import { createName, createBem } from '../utils'
import './index.less'

const name = createName('Option')
const bem = createBem('fect-option')

export default defineComponent({
  name,
  props: selectOptionProps,
  setup(props) {
    const { context } = useSelectContext()
    const { updateSelectVisible, updateSelectValue, updateDropDown, parentValue, size } = context!

    const handleClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      if (props.disabled) return
      updateSelectVisible()
      updateSelectValue(props.value)
      updateDropDown()
    }

    const setOptionClass = computed(() => {
      const checked = Array.isArray(parentValue)
        ? parentValue.includes(props.value as string)
        : parentValue === props.value
      return bem(null, { disabled: props.disabled, size, checked })
    })

    return () => (
      <div class={setOptionClass.value} onClick={handleClick}>
        {props.label}
      </div>
    )
  }
})
