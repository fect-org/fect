import type { PropType } from 'vue'

export const props = {
  modelValue: {
    type: String,
    default: ''
  },
  autocomplete: String,
  placeholder: String,
  readonly: Boolean,
  disabled: Boolean,
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit'>,
    default: 'none'
  },
  autoHeight: Boolean,
  width: String
}
