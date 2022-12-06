import { ElementRef, DraggableOptions, DraggableOutput, Position } from './interface'
import { useEventListener, useState } from '@fect-ui/vue-hooks'
import { isBrowser, getDomRect } from '../utils'

export const useDraggable = (el: ElementRef, options: DraggableOptions = {}): DraggableOutput => {
  const browser = isBrowser()
  const defaultWindow = browser ? window : undefined
  const dragElSnapshot = options.draggingElement ?? defaultWindow
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState<boolean>(false)

  const start = (e: Event) => {
    e.stopPropagation()
    e.stopImmediatePropagation()
    setDragging(true)
    const rect = getDomRect(el)
    setStartPosition({ x: rect.x, y: rect.y })
    options.onStart && options.onStart(e, rect)
  }
  const move = (e: Event) => {
    if (!dragging.value) return
    const { clientX, clientY } = e.type === 'touchmove' ? (e as TouchEvent).changedTouches[0] : (e as MouseEvent)
    const offsetX = clientX - startPosition.value.x
    const offsetY = clientY - startPosition.value.y
    setPosition({ x: offsetX, y: offsetY })
    options.onMove && options.onMove(e, position)
  }
  const end = (e: Event) => {
    if (!dragging.value) return
    setDragging(false)
    options.onEnd && options.onEnd(e, position)
  }
  if (browser) {
    useEventListener('mousedown', start, { target: el })
    useEventListener('touchstart', start, { target: dragElSnapshot })
    useEventListener('mousemove', move, { target: dragElSnapshot })
    useEventListener('touchmove', move, { target: dragElSnapshot })
    useEventListener('mouseup', end, { target: dragElSnapshot })
    useEventListener('touchend', end, { target: dragElSnapshot })
  }
  return {
    position
  }
}
