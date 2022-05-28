/**
 * This file will place some func module that can't be divided.
 */

export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'

export const isDEV = process.env.NODE_ENV !== 'production'
