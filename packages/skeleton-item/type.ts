import { tuple } from '../utils'

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
