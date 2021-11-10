import { tuple } from '../utils'

const labelPosition = tuple('left', 'right', 'top')

export type LabelPosition = typeof labelPosition[number]
