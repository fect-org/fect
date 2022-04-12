import type { PropType } from 'vue'
import { pick } from '../utils'
import type { JustifyTypes, AlignTypes } from '../utils'

export const props = {
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  },
  gutter: {
    type: [String, Number],
    default: 0
  },
  justify: {
    type: String as PropType<JustifyTypes>,
    default: 'start'
  },
  align: {
    type: String as PropType<AlignTypes>,
    default: 'top'
  }
}

export const colProps = {
  ...pick(props, ['tag']),
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  }
}
