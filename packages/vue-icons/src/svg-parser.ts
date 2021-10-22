export const parserStyle = (val, ident) => {
  if (!val) return '""'
  return val.includes(ident) ? '"currentColor"' : '"var(--primary-background)"'
}

export const replaceAll = (target: string, find: string, replace: string) => target.split(find).join(replace)

export const svgParser = (svg: string, style: string) => {
  const styles = style.split(';').reduce((acc, cur) => {
    const [prop, value] = cur
      .split(/^([^:]+):/)
      .filter((_, i) => i > 0)
      .map((item) => item.trim().toLocaleLowerCase())
    acc[prop] = value
    return acc
  }, {})
  const fillColor = parserStyle(styles['--geist-fill'], 'current')
  const strokeColor = parserStyle(styles['--geist-stroke'], 'current')
  svg = replaceAll(svg, '"var(--geist-foreground)"', 'currentColor')
  svg = replaceAll(svg, '"var(--geist-background)"', '"var(--primary-background)"')
  svg = replaceAll(svg, '"var(--geist-fill)"', fillColor)
  svg = replaceAll(svg, '"var(--geist-stroke)"', strokeColor)
  return svg
}

export const replaceStyle = (val = '') => {
  return val
    .replace(/width="([0-9]+)"/g, 'width={ setSize.value }')
    .replace(/height="([0-9]+)"/g, 'height={ setSize.value }')
    .replace(/style=(.+)">/g, 'style={{color:setColor.value}}>')
}

export const camelize = (name: string) => {
  const REG = /-(\w)/g
  return name.replace(REG, (_, key) => key.toUpperCase())
}
