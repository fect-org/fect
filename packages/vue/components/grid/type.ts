import { tuple } from '../utils'

const justifyTypes = tuple(
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
)

const alignTypes = tuple(
  'flex-start',
  'center',
  'flex-end',
  'stretch',
  'baseline',
)

const alignContentTypes = tuple(
  'stretch',
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
)

const directionTypes = tuple('row', 'row-reverse', 'column', 'column-reverse')

const wrapTypes = tuple('nowrap', 'wrap', 'wrap-reverse')

export const sizes = tuple('xs', 'sm', 'md', 'lg', 'xl')

export type JustifyTypes = typeof justifyTypes[number]

export type AlignTypes = typeof alignTypes[number]

export type AlignContentTypes = typeof alignContentTypes[number]

export type WrapTypes = typeof wrapTypes[number]

export type DirectionTypes = typeof directionTypes[number]
