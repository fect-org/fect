import { arrayTextToString, camelize, kebabCase, getId } from '../src/string'

describe('String', () => {
  it('arrayTextToString', () => {
    const data = ['shared', 'composables']
    const str = `shared\ncomposables`
    expect(arrayTextToString(data)).toEqual(str)
    expect(arrayTextToString([])).toEqual('')
    const empty = ['shared', '']
    expect(arrayTextToString(empty)).toEqual('shared')
  })

  it('camelize', () => {
    const original = '-shared-collection'
    expect(camelize(original)).toEqual('SharedCollection')
  })
  it('kebabCase', () => {
    const original = 'SharedCollection'
    expect(kebabCase(original)).toEqual('shared-collection')
  })
  it('getId', () => {
    expect(getId()).toBeTruthy()
  })
})
