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
    expect(omit(base, ['job'])).toEqual({ name: 'kanno' })
    expect(base).toEqual(base)
  })
  it('pick', () => {
    const base = {
      name: 'kanno',
      job: 'software engineer'
    }
    expect(pick(base, ['job'])).toEqual({ job: 'software engineer' })
    expect(base).toEqual(base)
  })

  it('hasOWn', () => {
    const base = {
      name: 'kanno'
    }
    expect(hasOwn(base, 'name')).toBe(true)
  })
})
