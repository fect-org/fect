import { unref } from 'vue'
import { isBrowser } from './window'
import { ElementRef } from '../composables/interface'

export type DomRect = Omit<DOMRect, 'toJSON'>

const genDomRect = (width: number, height: number) =>
  ({
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
    x: 0,
    y: 0
  } as DomRect)

export const getDomRect = (el: ElementRef): DomRect => {
  const element = unref(el)
  const browser = isBrowser()

  if (browser && element instanceof Window) return genDomRect(window.innerWidth, window.innerHeight)
  if (element && element.getBoundingClientRect) return element.getBoundingClientRect()
  return genDomRect(0, 0)
}
