import { props } from './props'
import type { ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance, NormalTypes } from '../utils'

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

export type { Placement as PopperPlacement, Instance as PopperInstance } from '@popperjs/core'

export type TooltipInstance = ComponentInstance<{
  tooltipVisible: Ref<boolean>
  updateTooltipRect: () => void
}>
