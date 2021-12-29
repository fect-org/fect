import type { Ref, ExtractPropTypes } from 'vue'
import { props } from './props'

export interface PaginationContext {
  props: ExtractPropTypes<typeof props>
  setCurrentPage: (val: number) => number
  updateSidePage: (type: string) => void
  head: Ref<boolean>
  end: Ref<boolean>
}

export type SideEvent = 'prev' | 'next'

export interface PaginationSize {
  font: string
  width: string
}
