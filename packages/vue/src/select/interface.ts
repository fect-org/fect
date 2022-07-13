import type { ExtractPropTypes, Ref, ComputedRef, DeepReadonly } from 'vue'
import type { ComponentInstance } from '../utils'
import { selectOptionProps, props } from './props'

interface SelectState {
  size: string
  disabled: boolean
}

export interface SelectContext {
  updateSelectVisible: () => void
  parentValue: DeepReadonly<Ref<string | number | Array<string | number>>>
  selectState: ComputedRef<SelectState>
  updateDropDown: () => void
  updateSelectValue: (val: string | number) => void
}

export type SelectPropInstance = ComponentInstance<ExtractPropTypes<typeof selectOptionProps>>

export type SelectProps = Partial<ExtractPropTypes<typeof props>>

export type SelectValue = string | number | Array<string | number>
