import { NormalTypes } from '../utils/theme/propTypes'

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

export type TooltipPosition = {
  top: string
  left: string
  transform: string
}

export type TolltipIconPosition = {
  top: string
  left: string
  right: string
  bottom: string
  transform: string
}

export type ParentDomRect = {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}
