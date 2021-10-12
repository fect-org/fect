import { defineComponent } from 'vue'

const InputLabel = defineComponent({
  props: {
    fontSize: String,
    isRight: Boolean,
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={`fect-input__label ${props.isRight ? 'suffix' : ''}`}
        style={{ fontSize: props.fontSize }}
      >
        {slots.default?.()}
      </div>
    )
  },
})

export default InputLabel
