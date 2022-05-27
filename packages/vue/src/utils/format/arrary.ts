export const { isArray } = Array

export const len = (source: unknown[] | string) => source.length

/**
 * For other language like golang we always use make init us slice. but
 * We can't simutale so I decide fill it with undefined as nil.
 */

export const make = (cap: number) => new Array(cap).fill(undefined)
