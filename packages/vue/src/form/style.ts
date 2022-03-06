/**
 * Form
 * FormItem
 */

import { labelPosition } from './type'
import { addUnit } from '../utils'
import type { LabelPosition } from './type'

export const getLabelPostion = (position: LabelPosition | '') => {
  if (!position) return null
  if (labelPosition.includes(position) && position !== 'top') return position
  return null
}

export const getLabelWidth = (width: string | number): string => addUnit(width)

export const getFormItemLayoutClass = (inline: boolean, labelPosition: LabelPosition, basisClass: string) => {
  let classStr = ''
  classStr += inline ? ` ${basisClass}--inline` : ''
  classStr += ` ${basisClass}--${labelPosition}`
  return classStr.trim()
}

export const getUnVerfiedClass = (display: boolean, basisClass: string) => {
  let classStr = ''
  classStr += !display ? ` ${basisClass}--hidden` : ''
  return classStr.trim()
}
