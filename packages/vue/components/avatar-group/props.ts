import { PropType } from 'vue'
import { NormalSizes } from '../utils'

export const sizeType = String as PropType<NormalSizes>

export const avatarProps = {
  stacked: {
    type: Boolean,
    default: null
  },
  isSquare: {
    type: Boolean,
    default: null
  },
  size: sizeType,
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
    type: sizeType,
    default: 'medium'
  }
}
