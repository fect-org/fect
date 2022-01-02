import type { ExtractPropTypes } from 'vue'
import type { ComponentInstance } from '../utils'
import { selectOptionProps, props } from './props'

export interface SelectContext {
  setVisible: (status: boolean) => void
  setParentValue: (val: string) => void
  updateSelectValue: (val: string) => void
}

export interface SizeStyle {
  height: string
  fontSize: string
  minWidth: string
}

export type SelectPropInstance = ComponentInstance<ExtractPropTypes<typeof selectOptionProps>>

export type SelectProps = Partial<ExtractPropTypes<typeof props>>
