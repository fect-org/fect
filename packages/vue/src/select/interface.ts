import type { ExtractPropTypes, Ref, ComputedRef } from 'vue'
import type { ComponentInstance } from '../utils'
import { selectOptionProps, props } from './props'

interface SelectState {
  size: string
  disabled: boolean
}

export interface SelectContext {
  updateSelectVisible: () => void
  parentValue: Ref<string | string[]>
  selectState: ComputedRef<SelectState>
  updateDropDown: () => void
  updateSelectValue: (val: string | number) => void
}

export type SelectPropInstance = ComponentInstance<ExtractPropTypes<typeof selectOptionProps>>

export type SelectProps = Partial<ExtractPropTypes<typeof props>>
