import { computed, ref } from 'vue'
import { createNameSpace, theme, validator } from '../utils'
import './input.less'

const [createComponent] = createNameSpace('Input')

const { normalSizes } = theme

export default createComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: String,
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    readonly: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    label: [String, Number],
    className: String,
  },
  setup(props, { attrs, slots, emit }) {
    const inputRef = ref(null)

    return () => (
      <div class={`fect-input ${props.className}`}>
        <div class={'input_container'}>
          <div class={'input_wrapper'}>
            <input
              ref={inputRef}
              type="text"
              placeholder={props.placeholder}
              readOnly={props.readonly}
              disabled={props.disabled}
              {...attrs}
            />
          </div>
        </div>
      </div>
    )
  },
})
