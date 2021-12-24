import { ComponentPublicInstance, CSSProperties, PropType } from 'vue'

export type ComponentInstance<T = Record<string, any>> = ComponentPublicInstance<T, any>

interface Customprop {
  [propname: string]: any
}

export type CustomCSSProperties = CSSProperties & Customprop

export const UnknowProp = null as unknown as PropType<unknown>
