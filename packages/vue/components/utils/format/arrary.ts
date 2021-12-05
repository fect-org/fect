import type { Tuple } from './interface'

export const isArray = (val: any): boolean => Array.isArray(val)

export const tuple: Tuple = (...rest) => rest
