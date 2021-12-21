import type { IntersectionToObj } from './interface'

export const omit = <T, K extends (string | number | symbol)[]>(
  source: T,
  ...exclude: K
): Pick<T, Exclude<keyof T, K[number]>> =>
  Object.keys(source).reduce(
    (acc, cur) => (exclude.includes(cur) ? acc : { ...acc, [cur]: source[cur as never] }),
    {} as T
  )

export const assign = <T extends Record<string | number | symbol, any>, K>(
  source: T,
  ...rest: K[]
): IntersectionToObj<Omit<T, keyof K> & K> => Object.assign(source, ...rest)

export const hasOwn = <T>(source: T, key: string) => Object.hasOwnProperty.call(source, key)
