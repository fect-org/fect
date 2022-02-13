import { assign, hasOwn } from '../format/object'

export const pickContextProps = (darft: Record<string, any>, parent?: Record<string, any> | null) => {
  if (parent) {
    const source = parent.props || parent
    return Object.keys(source).reduce((acc, cur) => {
      if (!hasOwn(darft, cur)) return acc
      return assign(acc, { [cur]: source[cur] })
    }, {})
  }
  return darft
}
