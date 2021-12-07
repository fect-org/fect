import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import type { WebsiteContext } from './interface'

const READONLY_WEBSITE_LEY = Symbol('websiteKey')

export const createWebsiteContext = () => createProvider(READONLY_WEBSITE_LEY)

export const useWebsiteContext = () => useProvider<WebsiteContext>(READONLY_WEBSITE_LEY)
