import { props } from './props'
import type { Placement } from '@popperjs/core'
import type { ExtractPropTypes } from 'vue'
import { NormalTypes } from '../utils'

export type PopperPlacement = Placement

export type ToolTipProps = ExtractPropTypes<typeof props>

export type TooltipTypes = NormalTypes | 'secondary' | 'dark' | 'lite'

export type PlacementTypes =
  | 'top'
  | 'topStart'
  | 'topEnd'
  | 'left'
  | 'leftStart'
  | 'leftEnd'
  | 'bottom'
  | 'bottomStart'
  | 'bottomEnd'
  | 'right'
  | 'rightStart'
  | 'rightEnd'

export type TriggerTypes = 'hover' | 'click'
