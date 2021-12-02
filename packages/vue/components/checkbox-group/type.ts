import type { Ref } from 'vue'
import type { NormalSizes } from '../utils'

export const READONLY_CHECKBOX_KEY = Symbol('checkboxKey')

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

export interface CheckboxGroupProvide {
  props: {
    disabled: boolean
    modelValue: string[]
    size: NormalSizes
    useRow: boolean
  }
  parentValue: Ref<string[]>
  updateParentValue: (val: string, checked: boolean) => void
  parentChangeHandler: (e: CheckboxEvent) => void
}
