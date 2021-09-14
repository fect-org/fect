import { unref } from 'vue'
import { useRect, ElementRef } from '../useRect'

export const getOffset = (el: ElementRef | null) => {
  if (!el) {
    return {
      top: 0,
      left: 0,
    }
  }
  const { top, left } = useRect(el)
  return { top, left }
}

export const getPosition = (curRef: ElementRef, contRef?: ElementRef) => {
  const rect = useRect(curRef)
  const container = unref(contRef) || null
  const scrollElement = container || document.documentElement
  const { top: offsetTop, left: offsetLeft } = getOffset(container)

  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    top: rect.top + scrollElement.scrollTop - offsetTop,
    left: rect.left + scrollElement.scrollLeft - offsetLeft,
    right: rect.right + scrollElement.scrollLeft,
    bottom: rect.bottom + scrollElement.scrollTop,
  }
}
