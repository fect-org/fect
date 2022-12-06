import { ComponentInstance } from '../utils'
import type { DeepReadonly, Ref } from 'vue'

export interface SwipeContext {
  index: DeepReadonly<Ref<number>>
  size: DeepReadonly<Ref<number>>
}

export interface Shape {
  width: number
  height: number
}

export type Placement = 'prev' | 'next'

export type SwipePropInstance = ComponentInstance<{
  setTranslate: (val: number) => void
}>
