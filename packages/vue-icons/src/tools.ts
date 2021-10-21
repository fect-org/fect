export interface styleOptions {
  [prop: string]: any
}

const camelize = (name: string) => {
  const REG = /-(\w)/g
  return name.replace(REG, (_, key) => key.toUpperCase())
}

export const replaceAll = (target: string, find: string, replace: string): string => {
  return target.split(find).join(replace)
}

const replaceStyle = (val = '') => {
  return val
    .replace(/width="([0-9]+)"/g, 'width={ setSize.value }')
    .replace(/height="([0-9]+)"/g, 'height={ setSize.value }')
    .replace(/style=(.+)">/g, 'style={{color:setColor.value}}>')
}

const parseStyle = (source = '') => {
  return source.split(';').reduce((acc: styleOptions, cur) => {
    const [prop, value] = cur
      .split(/^([^:]+):/)
      .filter((_, i) => i > 0)
      .map((item) => item.trim().toLocaleLowerCase())
    acc[prop] = value
    return acc
  }, {})
}

const parseSvg = (svg: string, style: any) => {
  const initColor = (val: string | undefined, ident: string) => {
    if (!val) return '""'
    return val.includes(ident) ? '"currentColor"' : '"var(--primary-background)"'
  }
  svg = replaceStyle(svg)
  const fillColor = initColor(style['--geist-fill'], 'current')
  const strokeColor = initColor(style['--geist-stroke'], 'current')

  svg = replaceAll(svg, '"var(--geist-fill)"', fillColor)
  svg = replaceAll(svg, '"var(--geist-stroke)"', strokeColor)

  return svg
}

export { camelize, replaceStyle, parseStyle, parseSvg }
