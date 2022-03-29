import { ComponentInstance } from '../utils'
import type { Ref } from 'vue'

export interface SwipeContext {
  index: Ref<number>
  size: Ref<number>
}

export interface Shape {
  width: number
  height: number
}

export type Placement = 'prev' | 'next'

export type SwipePropInstance = ComponentInstance<{
  setTranslate: (val: number) => void
}>
