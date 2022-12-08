import { isNumber } from '../src/number'

describe('Number', () => {
  it('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(false)
    expect(isNumber('string')).toBe(false)
  })
})
