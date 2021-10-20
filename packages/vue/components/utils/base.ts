import { ComponentPublicInstance, CSSProperties, PropType } from 'vue'

export type ComponentInstance = ComponentPublicInstance<{}, any>

interface Customprop {
  [propname: string]: any
}

export type CustomCSSProperties = CSSProperties & Customprop

export const UnknowProp = null as unknown as PropType<unknown>
