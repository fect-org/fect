import {
  onMounted,
  unref,
  onDeactivated,
  onBeforeUnmount,
  Ref,
  watch,
} from 'vue'

import { useState } from '../useState'

export type EventTypes = keyof WindowEventMap

export type ElementRef = EventTarget | Window

export type Options = {
  target?: EventTarget | Ref<EventTarget | undefined>
} & AddEventListenerOptions

export type Listener<E = Event> = {
  (evt: E): void
}

export const useEventListener = (
  event: string,
  listener: EventListener,
  options: Options = {}
) => {
  const { target = window } = options
  // , setElSnapshot
  // const [elSnapshot, setElSnapshot] = useState<ElementRef>(unref(target))

  let remove = () => {}

  watch(
    () => unref(target),
    (el) => {
      // setElSnapshot()
      // console.log(el)
      if (!el) return
      el.addEventListener(event, listener, options)
      remove = () => el.removeEventListener(event, listener, options)
    },
    { immediate: true, flush: 'post' }
  )

  onBeforeUnmount(remove)
  onDeactivated(remove)
}
