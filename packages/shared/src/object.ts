export const { assign } = Object

export function omit<T extends Record<string, unknown>, K extends keyof T>(source: T, picks: K[]) {
  return (Object.keys(source) as K[]).reduce(
    (acc, cur) => (picks.includes(cur) ? acc : assign(acc, { [cur]: source[cur] })),
    {} as Omit<T, K>
  )
}

export function hasOwn<T>(source: T, key: PropertyKey) {
  return Object.hasOwnProperty.call(source, key)
}

export function pick<T, K extends keyof T>(source: T, picks: K[]) {
  return picks.reduce((acc, cur) => ((acc[cur] = source[cur]), acc), {} as Pick<T, K>)
}

export function isPlainObject(tar: unknown): boolean {
  return typeof tar === 'object' && Object.prototype.toString.call(tar) === '[object Object]'
}
