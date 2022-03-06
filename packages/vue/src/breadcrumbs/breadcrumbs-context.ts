import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { BreadcrumbsContext } from './interface'

const READONLY_BREADCRUMBS_KEY = Symbol('breadcrumbsKey')

export const createBreadcrumbsContext = () => createProvider(READONLY_BREADCRUMBS_KEY)

export const useBreadcrumbsContext = () => useProvider<BreadcrumbsContext>(READONLY_BREADCRUMBS_KEY)
