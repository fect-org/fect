const tuple = <T extends string[]>(...args: T): T => {
  const noStr = [...args].map((_) => typeof _ !== 'string').includes(true)
  if (noStr) {
    throw new Error('[Fect] type Error. type is not string!')
  }
  return args
}

const buttonTypes = tuple('default', 'success', 'warning', 'error')

const normalSizes = tuple('mini', 'small', 'medium', 'large')

const normalTypes = tuple('default', 'success', 'warning', 'error')

const themeTypes = tuple('dark', 'light')

const justifyTypes = tuple(
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
)

const alignTypes = tuple('top', 'middle', 'bottom')

const snippetCopyTypes = tuple('default', 'silent', 'prevent')

const snippetStyleTypes = tuple(
  'default',
  'secondary',
  'success',
  'warning',
  'error',
  'lite',
  'dark',
)

const placeTypes = tuple('topLeft', 'topRight', 'bottomLeft', 'bottomRight')

export {
  tuple,
  buttonTypes,
  normalSizes,
  normalTypes,
  themeTypes,
  justifyTypes,
  alignTypes,
  snippetCopyTypes,
  snippetStyleTypes,
  placeTypes,
}
export type ButtonTypes = typeof buttonTypes[number]
export type NormalSizes = typeof normalSizes[number]
export type NormalTypes = typeof normalTypes[number]
export type ThemeTypes = typeof themeTypes[number]
export type JustifyTypes = typeof justifyTypes[number]
export type AlignTypes = typeof alignTypes[number]
export type SnippetCopyTypes = typeof snippetCopyTypes[number]
export type SnippetStyleTypes = typeof snippetStyleTypes[number]
export type PlaceTypes = typeof placeTypes[number]
