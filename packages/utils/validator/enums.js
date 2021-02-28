const isArray = (array) =>
  Object.prototype.toString.call(array) === '[object Array]'

const enums = (params) => (val) => {
  if (isArray(params)) {
    return !!params.find((item) => item === val)
  }
  return false
}

export { enums }
