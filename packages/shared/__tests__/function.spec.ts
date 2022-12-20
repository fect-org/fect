import { noop } from '../src/function'

describe('Function', () => {
  it('noop', () => {
    expect(noop()).toEqual({})
  })
})
