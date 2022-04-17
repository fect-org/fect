/**
 * we should convert val as Number type at first.
 * so we can get the bsic type
 * In fact, we treat nan as non-number type.
 * After version 1.4.1
 */
export const isNumber = (val: unknown): val is number => {
  val = Number(val)
  return !Number.isNaN(val)
}

export const numberParser = (val: string) => Number.parseFloat(val)
