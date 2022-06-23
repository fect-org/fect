const CAMELIZERE = /-(\w)/g
const KEBACASE = /[A-Z]+(?![a-z])|[A-Z]/g

export const camelize = (str: string): string => str.replace(CAMELIZERE, (_, key) => key.toUpperCase())

export const getId = () => Math.random().toString(32).slice(2, 10)

export const kebabCase = (str: string): string => str.replace(KEBACASE, (_, ofs) => (ofs ? '-' : '') + _.toLowerCase())

export const arrayTextToString = (text: string[]): string =>
  text.reduce((acc, cur) => {
    if (!cur) return acc
    return acc ? `${acc}\n${cur}` : cur
  }, '')
