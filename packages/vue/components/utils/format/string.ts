const CAMELIZERE = /-(\w)/g

const camelize = (str: string): string => str.replace(CAMELIZERE, (_, key) => key.toUpperCase())

const hasEmptry = (str: any): boolean => {
  if (typeof str === 'undefined') return true
  if (isNaN(str)) return true
  if (str === null) return true
  return false
}

export { camelize, hasEmptry }
