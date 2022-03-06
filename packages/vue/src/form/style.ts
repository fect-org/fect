/**
 * Form
 * FormItem
 */

import { labelPosition } from './interface'
import { addUnit } from '../utils'
import type { LabelPosition } from './interface'

export const getLabelPostion = (position: LabelPosition | '') => {
  if (!position) return null
  if (labelPosition.includes(position) && position !== 'top') return position
  return null
}

export const getLabelWidth = (width: string | number): string => addUnit(width)
