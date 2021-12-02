import type { Ref } from 'vue'
import type { NormalSizes } from '../utils'

export const READNONLY_RADIO_KEY = Symbol('radioKey')

export type Parent = number | string

export interface RadioGroupProvide {
  props: {
    modelValue: string | number
    useRow: boolean
    disabled: boolean
    size: NormalSizes
  }
  updateState: (val: RadioEvent) => void
  parentValue: Ref<Parent>
  setCurrentValue: (val: Parent) => void
}

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
