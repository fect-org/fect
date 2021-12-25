import { PropType } from 'vue'
import { NormalSizes } from '../utils'

const SizeType = String as PropType<NormalSizes>

export const AvatarProps = {
  stacked: {
    type: Boolean,
    default: null
  },
  isSquare: {
    type: Boolean,
    default: null
  },
  size: SizeType,
  text: {
    type: String,
    default: ''
  },
  src: String,
  className: String,
  alt: String
}

export const AvatarGroupProps = {
  count: [String, Number],
  stacked: Boolean,
  isSquare: Boolean,
  size: {
    type: SizeType,
    default: 'medium'
  }
}
