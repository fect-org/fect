import type { ExtractPropTypes, Ref } from 'vue'
import type { ComponentInstance } from '../utils'
import { tabProps, tabsProps } from './props'

export type TabPropInstance = ComponentInstance<ExtractPropTypes<typeof tabProps>>

export interface TabsContext {
  props: ExtractPropTypes<typeof tabsProps>
  checked: Ref<string | number>
}
