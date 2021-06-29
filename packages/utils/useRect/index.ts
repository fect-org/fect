import { Ref, unref } from 'vue'

type ElementRef = Element | Ref<Element | undefined>

export const useRect = (el: ElementRef) => {
  const element = unref(el)

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect()
  }
}

