import { defineComponent } from 'vue'
import { useSelectContext } from '../select/select-context'
import { selectOptionProps } from '../select/props'
import { hasEmpty } from '../select/select'
import { createName } from '../utils'
import './index.less'

const name = createName('Option')

export default defineComponent({
  name,
  props: selectOptionProps,
  setup(props) {
    const { context } = useSelectContext()
    const { setVisible, updateSelectValue } = context!

    const handleClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      if (props.disabled) return
      if (!hasEmpty(props.value)) {
        setVisible(false)
        updateSelectValue(props.value)
      }
    }
    return () => (
      <div class={`fect-option ${props.disabled ? 'disabled' : ''}`} onClick={handleClick}>
        {props.label}
      </div>
    )
  }
})
