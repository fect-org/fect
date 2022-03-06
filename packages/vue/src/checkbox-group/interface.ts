import { checkboxGroupProps } from './props'
import type { Ref, ExtractPropTypes } from 'vue'

interface CheckboxEeventTarget {
  checked?: boolean
  value?: string[]
}

export interface CheckboxEvent {
  target: CheckboxEeventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

export interface CheckboxContext {
  props: ExtractPropTypes<typeof checkboxGroupProps>
  parentValue: Ref<string[]>
  updateCheckboxGroupValue: (val: string) => void
  updateCheckboxGroupEvent: (e: CheckboxEvent) => void
}
