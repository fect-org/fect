import type { ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance, DomRect } from '../utils'
import { tabProps, tabsProps } from './props'

export type TabPropInstance = ComponentInstance<ExtractPropTypes<typeof tabProps>>

export interface TabsContext {
  props: ExtractPropTypes<typeof tabsProps>
  checked: Ref<string | number>
}

export type TabsHighlightRect = DomRect & {
  elementTop: number
}

export interface TabsHoverRatio {
  w: number
  h: number
}
