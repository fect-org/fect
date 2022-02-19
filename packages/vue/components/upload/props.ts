import type { PropType } from 'vue'
import type { BeforeReadFn, AfterReadFn } from './interface'

export const props = {
  assets: {
    type: Array,
    default: () => []
  },
  accept: {
    type: String,
    default: ''
  },
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  limit: Number,
  beforeRead: Function as PropType<BeforeReadFn>,
  afterRead: Function as PropType<AfterReadFn>
}
