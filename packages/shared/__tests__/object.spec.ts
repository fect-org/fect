import { assign, isPlainObject, omit, pick, hasOwn } from '../src/object'

describe('Object utils', () => {
  it('assign', () => {
    const base = {}
    assign(base, { name: 'kanno' })
    expect(base).toEqual({ name: 'kanno' })
  })

  it('isPlaninObject', () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject({})).toBe(true)
  })

  it('omit', () => {
    const base = {
      name: 'kanno',
      job: 'software engineer'
    }
    expect(omit(base, ['job'])).toBe({ name: 'kanno' })
    expect(base).toBe(base)
  })
  it('pick', () => {
    const base = {
      name: 'kanno',
      job: 'software engineer'
    }
    expect(pick(base, ['job'])).toBe({ job: 'software engineer' })
    expect(base).toBe(base)
  })

  it('hasOWn', () => {
    const base = {
      name: 'kanno'
    }
    expect(hasOwn(base, 'name')).toBe(true)
  })
})
