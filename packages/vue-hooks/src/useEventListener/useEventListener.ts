import { onMounted, unref, onDeactivated, onBeforeUnmount, Ref } from 'vue'

export type UseEventListenerOptions = {
  target?: EventTarget | Ref<EventTarget | undefined>
}

const useEventListener = (
  event: string,
  listener: EventListener,
  options: UseEventListenerOptions = {}
) => {
  const { target = window } = options

  const add = () => {
    const element = unref(target)
    if (element) {
      element.addEventListener(event, listener)
    }
  }

  const remove = () => {
    const element = unref(target)
    if (element) {
      element.removeEventListener(event, listener)
    }
  }

  onBeforeUnmount(remove)
  onDeactivated(remove)
  onMounted(add)
}

export { useEventListener }
