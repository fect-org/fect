import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { TabPropInstance, TabsContext } from './interface'

export const READONLY_TABS_KEY = Symbol('tabsKey')

export const createTabsContext = () => createProvider<TabPropInstance>(READONLY_TABS_KEY)

export const useTabsContext = () => useProvider<TabsContext>(READONLY_TABS_KEY)
