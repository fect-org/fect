import { onMounted, unref, onDeactivated, onBeforeUnmount, Ref, watch } from 'vue'

export type EventTypes = keyof WindowEventMap

export type Options = {
  target?: EventTarget | Ref<EventTarget | undefined>
} & AddEventListenerOptions

export const useEventListener = (
  event: EventTypes,
  listener: EventListenerOrEventListenerObject,
  options: Options = {}
) => {
  const { target = window, ...rest } = options

  const remove = (el: Options['target']) => {
    const _el = unref(el)
    console.log('removed', _el)
    _el && _el.removeEventListener(event, listener, rest)
  }

  const add = (el: Options['target']) => {
    const _el = unref(el)
    _el && _el.addEventListener(event, listener, rest)
  }

  watch(
    () => unref(target),
    (el, prevEl) => {
      remove(prevEl)
      add(el)
    }
  )

  onMounted(() => add(target))
  onDeactivated(() => remove(target))
  onBeforeUnmount(() => remove(target))
}
