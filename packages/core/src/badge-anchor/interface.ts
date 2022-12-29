import type { ComputedRef } from 'vue'
import type { PlaceTypes } from '../utils'

export interface TransformStyles {
  top?: string
  bottom?: string
  left?: string
  right?: string
  value: string
  origin: string
}

export interface BadgeAnchorContext {
  transform: ComputedRef<TransformStyles>
}

export type BadgeAnchorTypes = PlaceTypes
