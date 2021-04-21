import { ref } from 'vue'
import { createNameSpace, createProvider, theme, validator } from '../utils'
const [createComponent] = createNameSpace('CheckboxGroup')
import './checkBoxGroup.less'

const { normalSizes } = theme
const READONLY_CHECKBOX_KEY = 'checkboxKey'

export default createComponent({
  props: {
    disabled: Boolean,
    modelValue: {
      type: Array,
      default: () => [],
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
    const updateParentValue = (pre) => emit('update:modelValue', pre)
    const handlerParentChange = (e) => emit('change', e)
    provider({ props, updateParentValue, handlerParentChange })
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
