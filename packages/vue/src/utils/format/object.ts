export const omit = <T extends Record<string, unknown>, K extends keyof T>(source: T, picks: K[]) =>
  (Object.keys(source) as K[]).reduce(
    (acc, cur) => (picks.includes(cur) ? acc : Object.assign(acc, { [cur]: source[cur] })),
    {} as Omit<T, K>
  )

export const { assign } = Object

export const hasOwn = <T>(source: T, key: string) => Object.hasOwnProperty.call(source, key)

export const pick = <T, K extends keyof T>(source: T, picks: K[]) =>
  picks.reduce((acc, cur) => ((acc[cur] = source[cur]), acc), {} as Pick<T, K>)

export const isPlainObject = (tar: unknown): boolean =>
  typeof tar === 'object' && Object.prototype.toString.call(tar) === '[object Object]'
