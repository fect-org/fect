import type { ElementRef } from '../useRect'
import { useState, useEventListener } from '@fect-ui/vue-hooks'
import { isBrowser } from '../format/window'

export interface UserOptions {
  preventDefault?: boolean
}

type Position = {
  x: number
  y: number
}

export const useDraggable = (el: ElementRef, options: UserOptions) => {
  const draggingEl = window
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const start = () => {}

  const move = () => {}

  const end = () => {}
  if (isBrowser()) {
    useEventListener('pointerdown', start, { target: draggingEl })
    useEventListener('pointermove', move, { target: draggingEl })
    useEventListener('pointerup', end, { target: draggingEl })
  }
}
