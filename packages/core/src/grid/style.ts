/**
 * css-variable can't work with display
 * see: https://stackoverflow.com/questions/53213870/why-display-property-set-to-inherit-with-css-variable-doesnt-work
 */

import { assign } from '../utils'
import type { GridTypes, GridBreakPoint, LayoutVariable, BasisStyle } from './interface'
import type { CSSProperties } from '../utils'

export const getLayoutVariable = (grid: GridBreakPoint): LayoutVariable => {
  if (typeof grid === 'number') {
    grid = Math.abs(grid) > 24 ? 24 : grid
    const width = (100 / 24) * grid
    return {
      grow: 0,
      width,
      basis: width
    }
  }
  return {
    grow: 1,
    width: 100,
    basis: 0
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
      [`--${cur}-width`]: `${width}%`
    }
    return assign(acc, layout)
  }, {} as CSSProperties)
  return dynamicStyle
}

export const getDynamicLayoutClasses = (props: Record<string, any>) => {
  const state = (Object.keys(props) as string[]).reduce((acc, cur) => {
    const zero = props[cur] === 0 ? true : false
    if (zero) return assign(acc, { [`${cur}-0`]: true })
    if (props[cur]) return assign(acc, { [cur]: cur })
    return acc
  }, {})
  return state
}

export const getBasisStyle = (flexable: BasisStyle): CSSProperties => {
  const { alignContent, alignItems, direction, justify } = flexable
  return {
    alignContent,
    alignItems,
    flexDirection: direction,
    justifyContent: justify
  }
}

export const getUnitGapStyle = (gap: number): CSSProperties => {
  return {
    '--fect-grid-gap': `calc(${gap} * 16px * 1/3)`
  }
}

export const getGridStyle = (col: number): CSSProperties => {
  col = Math.abs(col) > 24 ? 24 : col
  const width = 100 / col
  return {
    '--grid-width': `${width}%`
  }
}
