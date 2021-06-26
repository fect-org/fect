import { watchEffect } from 'vue'
import { useProvider } from '@fect-ui/vue-hooks'
import { READONLY_SELECT_KEY } from '../Select'
import { createNameSpace } from 'packages/utils'

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
    const { context } = useProvider(READONLY_SELECT_KEY)
    const handleClick = (e: Event) => {
      if (props.disabled) return
      const targetEvent = {
        target: {
          value: props.value,
        },
        stopPropagation: e.stopPropagation,
        preventDefault: e.preventDefault,
        nativeEvent: e,
      }
      // ctx.setVisbile(false)
      // ctx.updateModelValue(props.value)
      // ctx.setChange(targetEvent)
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
