import { Ref } from 'vue'

export const WEB_SITE_KEY = Symbol('websiteKey')

export type webSiteProvide = {
  deploy: Ref<string>
  parentRouteHandler: (type: 'guide' | 'home' | 'components' | '') => any
}
