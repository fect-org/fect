import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import { InjectionKey } from 'vue'
import type { PaginationContext } from './interface'

const READONLY_PAGINATION_KEY: InjectionKey<PaginationContext> = Symbol('paginationKey')

export const createPaginationContext = () => createProvider(READONLY_PAGINATION_KEY)

export const usePaginationContext = () => useProvider(READONLY_PAGINATION_KEY)
