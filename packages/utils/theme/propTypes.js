const tuple = (...args) => {
  const temp = []
  const isStr = (key) =>
    Object.prototype.toString.call(key) === '[object String]'
  for (const key of args) {
    if (!isStr(key)) {
      throw new Error('type Error. type is not string!')
    }
    temp.push(key)
  }
  return temp
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
