import { computed, ref, toRefs } from 'vue'
import { createNameSpace, useProvider, theme } from '../utils'
import './selectOption.less'

const [createComponent] = createNameSpace('option')

const READONLY_SELECT_KEY = 'selectKey'

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
    const { ctx } = useProvider(READONLY_SELECT_KEY)
    const handleClick = (e) => {
      if (props.disabled) return
      const targetEvent = {
        target: {
          value: props.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      ctx.setVisbile(false)
      ctx.updateModelValue(props.value)
      ctx.setChange(targetEvent)
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
