const hexToRgb = (color) => {
  const reg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const full = color.replace(reg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`)
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ]
}

const colorToRgbValues = (color) => {
  if (color.charAt(0) === '#') return hexToRgb(color)
  const safeColor = color.replace(/ /g, '')
  const regArray = safeColor.match(/\((.+)\)/)
  return regArray[1].split(',').map((str) => Number.parseFloat(str))
}

const addColorAlpha = (color, alpha = 1) => {
  const reg = /^#|rgb|RGB/
  if (!reg.test(color)) return color
  const [r, g, b] = colorToRgbValues(color)
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}

export { hexToRgb, colorToRgbValues, addColorAlpha }
