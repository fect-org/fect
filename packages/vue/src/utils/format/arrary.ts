import type { Tuple } from './interface'

export const tuple: Tuple = (...rest) => rest

export const { isArray } = Array

export const len = (arr: any[]) => arr.length
