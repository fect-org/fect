import { Ref } from 'vue'

export const READONLY_SWIPE_KEY = 'swipeKey'

export type SwipeProvide = {
  index: Ref<number>
  size: Ref<number>
}

export type Placement = 'prev' | 'next'

export type Shape = {
  width: number
  height: number
}
