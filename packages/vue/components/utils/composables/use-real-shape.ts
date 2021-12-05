import { unref } from 'vue'
import type { ElementRef } from './interface'

const useRealShape = (el: ElementRef) => {
  const element = unref(el) as Element
  if (!element) {
    return console.error('<Fect> Error! Please use it in mounted life cycle')
  }
  const { width, height } = window.getComputedStyle(element)
  const getStyleVal = (str: string) => {
    if (!str) return 0
    const val = str.includes('px') ? +str.split('px')[0] : str
    return Number.isNaN(+val) ? 0 : +val
  }

  return {
    width: getStyleVal(width),
    height: getStyleVal(height),
  }
}

export { useRealShape }
