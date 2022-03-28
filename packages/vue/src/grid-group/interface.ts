import { ComputedRef } from 'vue'

export type JustifyTypes = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'

export type AlignTypes = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

export type AlignContentTypes = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'

export type DirectionTypes = 'row' | 'row-reverse' | 'column' | 'column-reverse'

export type WrapTypes = 'nowrap' | 'wrap' | 'wrap-reverse'

export type GridTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const READONLY_GRID_GROUP_KEY = Symbol('grdiGroup')

export interface GridGroupContext {
  useGrid: ComputedRef<boolean>
}
