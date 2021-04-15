const getCssValue = (val) => {
  // eslint-disable-next-line prefer-destructuring
  val = val.match(/^var\(([\s\S]*)\)/)[1]
  if (!val) return ''
  return window.getComputedStyle(document.documentElement).getPropertyValue(val)
}

export { getCssValue }
