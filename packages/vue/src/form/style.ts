import { addUnit } from '../utils'
import type { LabelPosition } from './interface'

const labelPosition = ['left', 'right', 'top']

export const getLabelPostion = (position: LabelPosition) => {
  if (!position) return
  if (labelPosition.includes(position) && position !== 'top') return position
  return
}

export const getLabelWidth = (width: string | number): string => addUnit(width)
