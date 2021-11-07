import { omit } from '../utils'
import { props as groupProps } from '../grid-group/props'

export const props = omit(groupProps, 'gap', 'wrap', 'col', 'count')
