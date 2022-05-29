import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { InjectionKey } from 'vue'
import type { TabPropInstance, TabsContext } from './interface'

export const READONLY_TABS_KEY: InjectionKey<TabsContext> = Symbol('tabsKey')

export const createTabsContext = () => createProvider<TabPropInstance>(READONLY_TABS_KEY)

export const useTabsContext = () => useProvider(READONLY_TABS_KEY)
