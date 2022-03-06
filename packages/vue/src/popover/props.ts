import { props as tooltipProps } from '../tooltip/props'
import { omit } from '../utils'

export const props = omit(tooltipProps, ['content'])
