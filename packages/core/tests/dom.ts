/**
 * Author: Kanno
 * Time: 2021-11-21
 * This file work in jest dom event .
 *
 *  @vue/tet-utils docs: https://next.vue-test-utils.vuejs.org/guide/
 */
import { nextTick } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'

type Wrapper = VueWrapper<ComponentPublicInstance<any, any, any>> | DOMWrapper<Element> | Element | Window

export const trigger = (evt: keyof WindowEventMap, wrapper: Wrapper, x = 0, y = 0, offsetX = 0, offsetY = 0) => {
  const el = 'element' in wrapper ? wrapper.element : wrapper
  const eventObserver = new CustomEvent<typeof evt>(evt)
  Object.assign(eventObserver, {
    clientX: x,
    clientY: y,
    offsetX,
    offsetY
  })
  el.dispatchEvent(eventObserver)
  return nextTick()
}
