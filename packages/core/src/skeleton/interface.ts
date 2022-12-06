import type { Ref } from 'vue'

export interface SkeletonContext {
  animated: Ref<boolean>
}

export type Variable = 'p' | 'text' | 'h1' | 'h3' | 'rect' | 'circle' | 'image' | 'button' | 'caption'
