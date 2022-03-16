import type { ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance } from '../utils'
import { selectOptionProps, props } from './props'

export interface SelectContext {
  updateSelectVisible: () => void
  parentValue: Ref<string | string[]>
  size: Ref<string>
  updateDropDown: () => void
  updateSelectValue: (val: string | number) => void
}

export type SelectPropInstance = ComponentInstance<ExtractPropTypes<typeof selectOptionProps>>

export type SelectProps = Partial<ExtractPropTypes<typeof props>>
