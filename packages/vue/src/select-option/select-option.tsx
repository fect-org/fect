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
    const { updateSelectVisible, updateSelectValue, updateDropDown, parentValue, selectState } = context!

    const handleClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      if (props.disabled) return
      updateSelectVisible()
      updateSelectValue(props.value)
      updateDropDown()
    }

    const setOptionClass = computed(() => {
      const parentVal = parentValue.value
      const checked = Array.isArray(parentVal) ? parentVal.includes(props.value as string) : parentVal === props.value
      return bem(null, { disabled: props.disabled, size: selectState.value.size, checked })
    })

    return () => (
      <div class={setOptionClass.value} onClick={handleClick}>
        {props.label}
      </div>
    )
  }
})
