import { Ref, unref } from 'vue'
import { useEventListener, EventTypes } from '../use-event-listener'

export interface useClickAwayOptions {
  event?: EventTypes
}

const defaultOptions: useClickAwayOptions = {
  event: 'click'
}

const isBrowser = (): boolean => {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement)
}

const useClickAway = (
  listener: EventListener,
  target: Element | Ref<Element | undefined>,
  options = defaultOptions
) => {
  if (!isBrowser()) return

  const onClick = (evt: Event) => {
    const element = unref(target)
    if (element && !element.contains(evt.target as Node)) {
      listener(evt)
    }
  }
  useEventListener(options.event!, onClick, { target: document })
}

export { useClickAway }
