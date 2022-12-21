import { len } from '@fect-ui/shared'

const hexColorToRgb = (hex: string): number[] => {
  hex = hex.indexOf('#') === 0 ? hex.slice(1) : hex
  const bigint = len(hex) === 3 ? parseInt(hex + hex, 16) : parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

const addColorAlpha = (hex: string, alpha = 1) => {
  const [r, g, b] = hexColorToRgb(hex)
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}

export { hexColorToRgb, addColorAlpha }
