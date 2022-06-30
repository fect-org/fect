import { unref } from 'vue'
import { isBrowser } from './window'
import { ElementRef, MaybeElement } from '../../composables/interface'

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

export const getScrollTop = (el: MaybeElement | Window): number => {
  if (!el) return 0
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset
  return Math.max(top, 0)
}

export const isHidden = (el: ElementRef): boolean => {
  const element = unref(el)
  if (!element) return false
  const style = window.getComputedStyle(element)
  const hidden = style.display === 'none'
  const parentHidden = (element as HTMLElement).offsetParent === null && style.position !== 'fixed'
  return hidden || parentHidden
}

export const isChildElement = (parent: Element | null | undefined, child: Element | null | undefined): boolean => {
  if (!parent || !child) return false
  let node: (Node & ParentNode) | null = child
  while (node) {
    if (node === parent) return true
    node = node.parentNode
  }
  return false
}
