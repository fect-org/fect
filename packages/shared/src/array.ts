export const { isArray } = Array

export function len<T extends unknown[]>(source: T | string) {
  return source.length
}

export function make(cap: number) {
  return new Array(cap).fill(undefined)
}
