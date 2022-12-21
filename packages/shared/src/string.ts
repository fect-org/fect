import { len } from './array'

export function arrayTextToString(text: string[]) {
  if (!len(text)) return ''
  return text.reduce((acc, cur) => {
    if (!cur) return acc
    return acc ? `${acc}\n${cur}` : cur
  }, '')
}

export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, key) => key.toUpperCase())
}

export function kebabCase(str: string) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (_, ofs) => (ofs ? '-' : '') + _.toLowerCase())
}

export function getId() {
  return Math.random().toString(32).slice(2, 10)
}
