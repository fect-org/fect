import { omit } from '@fect-ui/shared'
import { props as tooltipProps } from '../tooltip/props'

export const props = omit(tooltipProps, ['content'])
