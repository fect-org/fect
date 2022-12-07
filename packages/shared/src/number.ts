export function isNumber(val: unknown): val is number {
  val = Number(val)
  return !Number.isNaN(val)
}


