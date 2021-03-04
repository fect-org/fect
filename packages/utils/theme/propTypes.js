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

export { buttonTypes, normalSizes, normalTypes, themeTypes }
