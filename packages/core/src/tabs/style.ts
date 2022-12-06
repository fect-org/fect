/**
 * rect file for tabs highlight.
 */
import { unref } from 'vue'
import { getDomRect } from '../utils'
import type { MaybeElement } from '../composables'

export const getHighlightRect = (elRef: MaybeElement, container: MaybeElement) => {
  const elRect = getDomRect(elRef)
  const { top: offsetTop, left: offsetLeft } = getDomRect(container)
  const containerEl = unref(container)!
  return {
    ...elRect,
    width: elRect.width || elRect.right - elRect.left,
    height: elRect.height || elRect.top - elRect.bottom,
    top: elRect.bottom + containerEl.scrollTop - offsetTop,
    left: elRect.left + containerEl.scrollLeft - offsetLeft,
    elementTop: elRect.top + containerEl.scrollTop - offsetTop
  }
}
