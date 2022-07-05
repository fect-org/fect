/**
 * see : https://github.com/vuejs/vue-next/issues/2020
 */

import { getCurrentInstance } from 'vue'
import type { PropType, ComponentPublicInstance, ExtractPropTypes } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { pick } from '../utils'

export const routeProps = {
  to: [String, Object] as PropType<RouteLocationRaw>
}

export type RouteProps = ExtractPropTypes<typeof routeProps>

export const useRoute = () => {
  const vm = getCurrentInstance()!.proxy as ComponentPublicInstance<RouteProps>
  const router = vm.$router
  if (router) {
    // vue-router next docs: https://router.vuejs.org/api/
    return pick(router, ['push', 'replace', 'go'])
  }
  return null
}
