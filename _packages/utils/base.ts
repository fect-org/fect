import { ComponentPublicInstance, CSSProperties } from 'vue'

export type ComponentInstance = ComponentPublicInstance<{}, any>

interface Customprop {
  [propname: string]: any
}

export type CustomCSSProperties = CSSProperties & Customprop
