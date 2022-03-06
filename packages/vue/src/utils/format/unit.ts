import { isNumber } from './number'

export const addUnit = (val: number | string, unit = 'px'): string => {
  if (isNumber(val)) return `${Number(val)}${unit}`
  if (typeof val === 'string') return val
  return ''
}
