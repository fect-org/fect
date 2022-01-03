const CAMELIZERE = /-(\w)/g
const KEBACASE = /[A-Z]+(?![a-z])|[A-Z]/g

export const camelize = (str: string): string => str.replace(CAMELIZERE, (_, key) => key.toUpperCase())

export const hasEmpty = (str: any): boolean => {
  if (typeof str === 'undefined') return true
  if (isNaN(str)) return true
  if (str === null) return true
  return false
}

export const getId = () => Math.random().toString(32).slice(2, 10)

export const kebabCase = (str: string): string => str.replace(KEBACASE, (_, ofs) => (ofs ? '-' : '') + _.toLowerCase())
