export type JustifyTypes = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'

export type AlignTypes = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

export type AlignContentTypes = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'

export type DirectionTypes = 'row' | 'row-reverse' | 'column' | 'column-reverse'

export type WrapTypes = 'no-wrap' | 'wrap' | 'wrap-reverse'

export type GridTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface LayoutVariable {
  grow: number
  width: number
  basis: number
}

export type GridBreakPoint = number | boolean

export type GridLayout = Record<GridTypes, LayoutVariable>

export interface BasisStyle {
  alignContent: AlignContentTypes
  alignItems: AlignTypes
  direction: DirectionTypes
  justify: JustifyTypes
}
