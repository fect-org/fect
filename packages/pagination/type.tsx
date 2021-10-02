import { Ref } from 'vue'
import { NormalSizes } from '../utils'

export interface PaginationSize {
  font: string
  width: string
}

type Props = {
  modelValue: number
  count: string | number
  size: NormalSizes
  prevText: string
  nextText: string
  simple: boolean
  limit: number
}

export type PaginationProvide = {
  setCurrentPage: (val: number) => number
  updateSidePage: (type: string) => void
  head: Ref<boolean>
  end: Ref<boolean>
  props: Props
}

export type SideEvent = 'prev' | 'next'

export const READONLY_PAGINATION_KEY = 'paginationKey'
