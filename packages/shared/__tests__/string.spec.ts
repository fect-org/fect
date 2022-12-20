import { arrayTextToString, camelize, kebabCase, getId } from '../src/string'

describe('String', () => {
  it('arrayTextToString', () => {
    const data = ['shared', 'composables']
    const str = `shared\ncomposables`
    expect(arrayTextToString(data)).toEqual(str)
  })

  it('camelize', () => {
    const original = '-shared-collection'
    expect(camelize(original)).toBe('SharedCollection')
  })
  it('kebabCase', () => {
    const original = 'SharedCollection'
    expect(kebabCase(original)).toBe('shared-collection')
  })
  it('getId', () => {
    expect(getId()).toBeTruthy()
  })
})
