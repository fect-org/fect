import { Ref } from 'vue'
import { NormalSizes } from '../utils/theme/propTypes'

export interface PaginationSize {
  font: string
  width: string
}

interface Props {
  modelValue: Ref<number>
  count: Ref<string | number>
  size: Ref<NormalSizes>
  prevText: Ref<string>
  nextText: Ref<string>
  simple: Ref<boolean>
  limit: Ref<number>
}

export type PaginationProvide = {
  setCurrentPage: (val: number) => number
  sideUpdatePage: (type: string) => void
  isFirst: Ref<boolean>
  isLast: Ref<boolean>
} & Props

export const READONLY_PAGINATION_KEY = 'paginationKey'
