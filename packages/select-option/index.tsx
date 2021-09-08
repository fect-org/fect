import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_SELECT_KEY, SelectProvide } from '../select'
import { createNameSpace } from '../utils'
import './index.less'

const [createComponent] = createNameSpace('Option')

export default createComponent({
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const { context } = useProvider<SelectProvide>(READONLY_SELECT_KEY)
    const { setChange, setVisible, updateModelValue } = context!

    const handleClick = (e: Event) => {
      if (props.disabled) return
      if (props.value) {
        const targetEvent = {
          target: {
            value: props.value,
          },
          stopPropagation: e.stopPropagation,
          preventDefault: e.preventDefault,
          nativeEvent: e,
        }
        setVisible(false)
        updateModelValue(props.value)
        setChange(targetEvent)
      }
    }
    return () => (
      <div
        class={`fect-option ${props.disabled ? 'disabled' : ''}`}
        onClick={handleClick}
      >
        {props.label}
      </div>
    )
  },
})
