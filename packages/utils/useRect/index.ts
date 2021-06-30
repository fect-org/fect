import { Ref, unref } from 'vue'

type ElementRef = Element | Ref<Element | undefined>

type RectProvide = {
  width: number
  height: number
  left: number
  right: number
  bottom: number
  top: number
  x: number
  y: number
}

export const useRect = (el: ElementRef): RectProvide => {
  const element = unref(el)

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect()
  }
  return {
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  }
}
