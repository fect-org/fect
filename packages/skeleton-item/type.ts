import { tuple } from '../utils/theme/propTypes'

const variable = tuple(
  'p',
  'text',
  'h1',
  'h3',
  'rect',
  'circle',
  'image',
  'button',
  'caption',
)
export type Variable = typeof variable[number]
