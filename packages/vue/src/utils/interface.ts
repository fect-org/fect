import { ComponentPublicInstance, CSSProperties as JSXCSSPropertes, PropType } from 'vue'

export type ComponentInstance<T = Record<string, any>> = ComponentPublicInstance<T, any>

export type CSSProperties = JSXCSSPropertes & {
  [prop: string]: any
}

export const UnknowProp = null as unknown as PropType<unknown>
