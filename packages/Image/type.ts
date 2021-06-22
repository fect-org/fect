import { ComputedRef } from 'vue'

export type BrowserColors = {
  color: string
  barBgColor: string
  inputBgColor: string
  borderColor: string
  titleColor: string
}

type HeadAttrs = {
  head: string
  show: boolean
}

export type ImageProvide = {
  setColors: ComputedRef<BrowserColors>
  showLinkType: ComputedRef<string>
  setHead: ComputedRef<HeadAttrs>
}

export const READONLY_IMAGE_KEY = 'imageKey'
