import { defineComponent } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_SELECT_KEY, SelectProvide } from '../select/type'
import { hasEmpty } from '../select/select'
import { createName } from '../utils'
import './index.less'

const name = createName('Option')

export default defineComponent({
  name,
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: Boolean
  },
  setup(props, { slots }) {
    const { context } = useProvider<SelectProvide>(READONLY_SELECT_KEY)
    const { setVisible, setParentValue } = context!

    const handleClick = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      if (props.disabled) return
      if (!hasEmpty(props.value)) {
        setVisible(false)
        setParentValue(props.value)
      }
    }
    return () => (
      <div class={`fect-option ${props.disabled ? 'disabled' : ''}`} onClick={handleClick}>
        {props.label}
      </div>
    )
  }
})
