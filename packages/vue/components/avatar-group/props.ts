import { PropType } from 'vue'
import { NormalSizes } from '../utils'

export const avatarProps = {
  stacked: Boolean,
  isSquare: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  },
  text: {
    type: String,
    default: ''
  },
  src: String,
  className: String,
  alt: String
}

export const avatarGroupProps = {
  count: [String, Number],
  stacked: Boolean,
  isSquare: Boolean,
  size: {
    type: String as PropType<NormalSizes>,
    default: 'medium'
  }
}
