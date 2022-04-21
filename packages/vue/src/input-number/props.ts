import { props } from '../input/props'
import { omit, assign } from '../utils'

export const inputNumberProps = assign(omit(props, ['prefix', 'suffix', 'type']), {
  max: { type: Number, default: Infinity },
  min: { type: Number, default: Infinity },
  modelValue: { type: Number }
})
