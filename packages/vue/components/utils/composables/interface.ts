import type { Ref } from 'vue'
import { DomRect } from '../format'

export type MaybeElement = Element | undefined

export type ElementRef = MaybeElement | Ref<MaybeElement>

export interface Position {
  x: number
  y: number
}

export interface DraggableOptions {
  draggingElement?: ElementRef
  onStart?: (e: Event, rect: DomRect) => void
  onMove?: (e: Event, position: Ref<Position>) => void
  onEnd?: (e: Event, position: Ref<Position>) => void
}

export interface DraggableOutput {
  position: Ref<Position>
}

export type Theme = 'light-theme' | 'dark-theme'

export type WinWidth = Ref<number>
export type WinHeight = Ref<number>

export interface KeyboardOptions {
  target?: ElementRef | Document
  event: 'keydown' | 'keypress' | 'keyup'
  disableGlobalEvent?: boolean
  stopPropagation?: boolean
  preventDefault?: boolean
  capture?: boolean
}

export type UseKeyboardHandler = (event: KeyboardEvent) => void
