import { len } from '@fect-ui/shared'

export const withClassName = (...calssNames: string[]) => {
  if (!len(calssNames)) return ''
  return calssNames.reduce((acc, cur) => (acc += ` ${cur}`), '').trim()
}
