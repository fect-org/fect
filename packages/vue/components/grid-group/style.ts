/**
 * css-variable can't work with display
 * see: https://stackoverflow.com/questions/53213870/why-display-property-set-to-inherit-with-css-variable-doesnt-work
 */

import type { JustifyTypes, AlignTypes, DirectionTypes, AlignContentTypes, GridTypes } from './type'
import type { CustomCSSProperties } from '../utils'

export type LayoutVariable = {
  grow: number
  width: number
  basis: number
}

export type GridBreakPoint = number | boolean

export type GridLayout = Record<GridTypes, LayoutVariable>

export type BasisStyle = {
  alignContent: AlignContentTypes
  alignItems: AlignTypes
  direction: DirectionTypes
  justify: JustifyTypes
}

export const getLayoutVariable = (grid: GridBreakPoint): LayoutVariable => {
  if (typeof grid === 'number') {
    grid = Math.abs(grid) > 24 ? 24 : grid
    const width = (100 / 24) * grid
    return {
      grow: 0,
      width,
      basis: width,
    }
  }
  return {
    grow: 1,
    width: 100,
    basis: 0,
  }
}

export const getDynamicStyle = (props: Record<GridTypes, GridBreakPoint>) => {
  const { xs, sm, md, lg, xl } = props
  const grids = Object.keys({ xs, sm, md, lg, xl }) as GridTypes[]
  const dynamicStyle = grids.reduce((acc, cur) => {
    const hasGrid = props[cur] === false
    if (hasGrid) return acc
    const { grow, basis, width } = getLayoutVariable(props[cur])
    const layout = {
      [`--${cur}-grow`]: grow,
      [`--${cur}-basis`]: `${basis}%`,
      [`--${cur}-width`]: `${width}%`,
    }
    return Object.assign(acc, layout)
  }, {} as CustomCSSProperties)
  return dynamicStyle
}

export const getDynamicLayoutClass = (props: Record<GridTypes, GridBreakPoint>, basisClass: string) => {
  const { xs, sm, md, lg, xl } = props
  return (Object.keys({ xs, sm, md, lg, xl }) as GridTypes[])
    .map((grid) => {
      //  grid be zero should set  display:none
      const hasGrid = props[grid] === false
      if (props[grid] === 0) return `${basisClass}--${grid}-0 `
      if (!hasGrid) return `${basisClass}--${grid} `
      return
    })
    .join('')
}

export const getBasisStyle = (flexable: BasisStyle): CustomCSSProperties => {
  const { alignContent, alignItems, direction, justify } = flexable
  return {
    alignContent,
    alignItems,
    flexDirection: direction,
    justifyContent: justify,
  }
}

export const getUnitGapStyle = (gap: number): CustomCSSProperties => {
  return {
    '--fect-grid-gap': `calc(${gap} * 16px * 1/3)`,
  }
}
