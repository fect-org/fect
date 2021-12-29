import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { PaginationContext } from './interface'

const READONLY_PAGINATION_KEY = Symbol('paginationKey')

export const createPaginationContext = () => createProvider(READONLY_PAGINATION_KEY)

export const usePaginationContext = () => useProvider<PaginationContext>(READONLY_PAGINATION_KEY)
