import { isNumber, isBrowser } from '@fect-ui/shared'
import { numberParser } from './number'

export const addUnit = (val: number | string, unit = 'px'): string => {
  if (isNumber(val)) return `${Number(val)}${unit}`
  if (typeof val === 'string') return val
  return ''
}

// cache

let rootFontSize: number

const getRootFontSize = () => {
  if (!rootFontSize) {
    const doc = document.documentElement
    rootFontSize = numberParser(doc.style.fontSize || window.getComputedStyle(doc).fontSize)
  }
  return rootFontSize
}

const convertRem = (val: string) => {
  val = val.replace('rem', '')
  return +val * getRootFontSize()
}

const convertVh = (val: string) => {
  val = val.replace('vh', '')
  return (+val * window.innerWidth) / 100
}

const convertVw = (val: string) => {
  val = val.replace('vw', '')
  return (+val * window.innerWidth) / 100
}

export const convertUnitToPx = (val: number | string): number => {
  if (isNumber(val)) return Number(val)
  if (isBrowser()) {
    if (val.indexOf('rem') !== -1) {
      return convertRem(val)
    }
    if (val.indexOf('vw') !== -1) {
      return convertVw(val)
    }
    if (val.indexOf('vh') !== -1) {
      return convertVh(val)
    }
  }
  return numberParser(val)
}
