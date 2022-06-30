import { withModifiers as vueWithModifiers, capitalize } from 'vue'
import type { Events } from 'vue'
import { assign, len } from '../format'

export type Event = {
  [key in keyof Events]: ((evt: Events[key]) => void) | undefined
}

/**
 * This is a internal function that rewrites the original function to add modifiers. Why should we to override the
 * original function? Because we need to add more modifiers like `keydownCapture` and `keyupCapture`. Document guide:
 * https://vuejs.org/guide/essentials/event-handling.html#key-modifiers Details see:
 * https://github.com/vuejs/core/issues/3827#issuecomment-847850757 Vue core repository url:
 * https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/directives/vOn.ts Vue core compiler-dom:
 * https://github.com/vuejs/core/blob/main/packages/compiler-dom/src/transforms/vOn.ts
 * https://github.com/vuejs/core/blob/main/packages/compiler-dom/__tests__/transforms/vOn.spec.ts
 *
 * @description:
 * @keydown.capture will be transformed to onKeydownCapture
 */

const internalModifiers = ['capture', 'once', 'passive']

export const withModifiers = (events: Partial<Event>, modifiers: string[]) => {
  const isInternalModifers = (modier: string): boolean => internalModifiers.includes(modier)

  const internals = modifiers.filter(isInternalModifers)
  const modifiersWithoutInternals = modifiers.filter((modifier) => !isInternalModifers(modifier))

  const binding = (evt: keyof typeof events) => {
    return {
      [`${evt}${internals.map(capitalize).join('')}`]: len(modifiersWithoutInternals)
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          vueWithModifiers(events[evt], modifiersWithoutInternals)
        : events[evt]
    }
  }

  return Object.keys(events).reduce((acc, cur) => {
    assign(acc, binding(cur as any))
    return acc
  }, {})
}
