/**
 * automatic calc textarea height
 */

import { unref } from 'vue'
import { createNode, numberParser, addUnit } from '../utils'
import type { ElementRef } from '../composables'

const HIDDEN_TEXTARE_NAME = 'fect-ui--textarea'

const TARGET_STYLE_CONTEXT = [
  'display',
  'min-height',
  'height',
  'width',
  'border-radius',
  'box-shadow',
  'background-color',
  'padding',
  'box-sizing',
  'font-size'
]

const HIDDEN_STYLE = `height:0 !important;
visibility:hidden !important;
overflow:hidden !important;
position:absolute !important;
z-index:-1000 !important;
top:0 !important;
right:0 !important;`

const getStylePropertyValue = (style: CSSStyleDeclaration, attr: string) => style.getPropertyValue(attr)

const getNodeStyleAttrs = (el: Element) => {
  const style = window.getComputedStyle(el)
  const padding =
    numberParser(getStylePropertyValue(style, 'padding-top')) +
    numberParser(getStylePropertyValue(style, 'padding-bottom'))

  const styleContext = TARGET_STYLE_CONTEXT.map((_) => `${_}:${getStylePropertyValue(style, _)}`).join(';')

  return { padding, styleContext }
}

export const getTextareaAutoHeight = (el: ElementRef) => {
  const elSnapshot = unref(el)! as HTMLTextAreaElement
  const node = createNode(HIDDEN_TEXTARE_NAME, 'textarea') as HTMLTextAreaElement
  const { padding, styleContext } = getNodeStyleAttrs(elSnapshot)
  node.setAttribute('style', `${styleContext};${HIDDEN_STYLE}`)
  node.value = elSnapshot.value || elSnapshot.placeholder || ''
  const hiddenHeight = node.scrollHeight + padding
  node.value = ''
  return {
    node,
    height: addUnit(hiddenHeight)
  }
}
