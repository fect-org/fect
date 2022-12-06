import type { PropType } from 'vue'
import type { NormalSizes } from '../utils'
import type { SelectValue } from './interface'

export const props = {
  modelValue: {
    type: [String, Number, Array] as PropType<SelectValue>,
    default: ''
  },
  value: {
    type: [String, Number, Array] as PropType<SelectValue>,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  multiple: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  visibleArrow: {
    type: Boolean,
    default: true
  }
}

export const selectOptionProps = {
  value: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  disabled: Boolean
}
