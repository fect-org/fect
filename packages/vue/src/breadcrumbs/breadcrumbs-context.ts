import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { BreadcrumbsContext } from './interface'

const READONLY_BREADCRUMBS_KEY: InjectionKey<BreadcrumbsContext> = Symbol('breadcrumbsKey')

export const createBreadcrumbsContext = () => createProvider(READONLY_BREADCRUMBS_KEY)

export const useBreadcrumbsContext = () => useProvider(READONLY_BREADCRUMBS_KEY)
