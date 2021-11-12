import { onMounted, unref, onDeactivated, onBeforeUnmount, Ref, watch } from 'vue'

import { useState } from '../useState'

export type EventTypes = keyof WindowEventMap

export type ElementRef = EventTarget | Window | Document

export type Options = {
  target?: EventTarget | Ref<EventTarget | undefined>
} & AddEventListenerOptions

export type Listener<E = Event> = {
  (evt: E): void
}

export const useEventListener = (event: string, listener: EventListener, options: Options = {}) => {
  const { target = window } = options
  const [elSnapshot, setElSnapshot] = useState<ElementRef>()
  let remove = () => {}
  onMounted(() => {
    const element = unref(target)
    if (element) {
      setElSnapshot(element)
    }
  })

  watch(elSnapshot, (el) => {
    if (!el) return
    el.addEventListener(event, listener, options)
    remove = () => el.removeEventListener(event, listener, options)
  })

  onBeforeUnmount(remove)
  onDeactivated(remove)
}
