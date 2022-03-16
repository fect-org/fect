import type { Ref } from 'vue'
import { tuple } from '../utils'

export interface SkeletonContext {
  animated: Ref<boolean>
}

const variable = tuple('p', 'text', 'h1', 'h3', 'rect', 'circle', 'image', 'button', 'caption')
export type Variable = typeof variable[number]
