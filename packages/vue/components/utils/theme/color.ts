const hexToRgb = (hex: string): number[] => {
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

const addColorAlpha = (hex: string, alpha = 1) => {
  const [r, g, b] = hexToRgb(hex)
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}

export { hexToRgb, addColorAlpha }
