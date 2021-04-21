import { computed } from 'vue'
import { createNameSpace, createProvider, theme, validator } from '../utils'
const [createComponent] = createNameSpace('CheckboxGroup')
import './checkBoxGroup.less'

const { normalSizes } = theme
const READONLY_CHECKBOX_KEY = 'checkboxKey'

export default createComponent({
  props: {
    disabled: Boolean,
    modelValue: {
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: validator.enums(normalSizes),
    },
    useRow: Boolean,
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { provider } = createProvider(READONLY_CHECKBOX_KEY)
    const setParentModelValue = (pre) => emit('update:modelValue', pre)
    const handlerParentChange = (e) => emit('change', e)
    provider({ props, setParentModelValue, handlerParentChange })
    return () => (
      <>
        <div
          {...attrs}
          class={`fect-checkbox_group ${props.useRow ? 'useRow' : ''}`}
        >
          {slots.default?.()}
        </div>
      </>
    )
  },
})
