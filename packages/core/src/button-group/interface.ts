import type { ExtractPropTypes } from 'vue'
import { buttonGroupProps } from './props'

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>

export interface ButtonGroupContext {
  props: ButtonGroupProps
}
