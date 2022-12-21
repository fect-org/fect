import { isArray, len, make } from '../src/array'

describe('Array', () => {
  it('isArray', () => {
    expect(isArray({})).toBe(false)
  })

  it('len', () => {
    expect(len('123')).toBe(3)
    expect(len([1, 2, 3, 4])).toBe(4)
  })

  it('cap', () => {
    const cap = make(5)
    expect(len(cap)).toBe(5)
  })
})
