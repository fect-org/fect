import { Ref, unref } from 'vue'
import { useEventListener } from '../useEventListener'

export interface useClickAwayOptions {
  event?: string
}

const defaultOptions: useClickAwayOptions = {
  event: 'click',
}

const useClickAway = (
  listener: EventListener,
  target: Element | Ref<Element | undefined>,
  options = defaultOptions
) => {
  const onClick = (evt: Event) => {
    const element = unref(target)
    if (element && !element.contains(evt.target as Node)) {
      listener(evt)
    }
  }
  useEventListener(options.event!, onClick, { target: document })
}

export { useClickAway }
