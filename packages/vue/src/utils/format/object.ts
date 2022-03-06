import type { IntersectionToObj } from './interface'

export const omit = <T, K extends keyof T>(source: T, picks: K[]) =>
  (Object.keys(source) as K[]).reduce(
    (acc, cur) => (picks.includes(cur) ? acc : Object.assign(acc, { [cur]: source[cur] })),
    {} as Omit<T, K>
  )

export const assign = <T extends Record<string | number | symbol, any>, K>(
  source: T,
  ...rest: K[]
): IntersectionToObj<Omit<T, keyof K> & K> => Object.assign(source, ...rest)

export const hasOwn = <T>(source: T, key: string) => Object.hasOwnProperty.call(source, key)

export const pick = <T, K extends keyof T>(source: T, picks: K[]) =>
  picks.reduce((acc, cur) => ((acc[cur] = source[cur]), acc), {} as Pick<T, K>)
