import {
  onMounted,
  unref,
  onUnmounted,
  onDeactivated,
  onBeforeUnmount,
} from 'vue'

/**
 *
 * @param {event} HTMLEvent
 * @param {lisetner} EventCallback
 * @param {target}
 */

const useEventListener = (event, listener, target = window) => {
  const add = () => {
    const element = unref(target)

    element.addEventListener(event, listener)
  }
  const remove = () => {
    const element = unref(target)
    element.removeEventListener(event, listener)
  }
  onBeforeUnmount(remove)
  onDeactivated(remove)
  onMounted(add)
}

export { useEventListener }
