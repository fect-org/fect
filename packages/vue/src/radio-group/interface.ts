import type { Ref } from 'vue'
import type { NormalSizes } from '../utils'

export type Parent = number | string

export interface RadioEeventTarget {
  checked?: boolean
  checkedVal?: string | number
}

export interface RadioEvent {
  target: RadioEeventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

export interface RadioGroupContext {
  props: {
    modelValue: string | number
    useRow: boolean
    disabled: boolean
    size: NormalSizes
  }
  updateRadioGroupChangeEvent: (val: RadioEvent) => void
  parentValue: Ref<Parent>
  updateRadioGroupValue: (val: Parent) => void
}
