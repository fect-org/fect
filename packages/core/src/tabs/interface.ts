import type { DeepReadonly, ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance, DomRect } from '../utils'
import { tabProps, tabsProps } from './props'

export type TabPropInstance = ComponentInstance<ExtractPropTypes<typeof tabProps>>

export interface TabsContext {
  props: ExtractPropTypes<typeof tabsProps>
  checked: DeepReadonly<Ref<string | number>>
}

export type TabsHighlightRect = DomRect & {
  elementTop: number
}

export interface TabsHoverRatio {
  w: number
  h: number
}

export interface TabEvent {
  target: {
    checkValue: string | number
  }
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}
