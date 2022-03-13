import { assign, hasOwn } from '../format/object'

export const pickContextProps = <T extends Record<string, any>, K extends Record<string, any> | null>(
  draft: T,
  parent: K,
  invert = false
): T => {
  if (!parent) return draft
  const source = parent.props || parent
  const slice = Object.keys(source)
  const len = slice.length
  if (!len) return draft
  return slice.reduce((acc, cur) => {
    if (!hasOwn(draft, cur)) return acc
    const nil = !source[cur] || invert
    return assign(acc, { [cur]: nil ? draft[cur] : source[cur] })
  }, {} as Pick<T, any>)
}
