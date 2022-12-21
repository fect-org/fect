import { isBrowser, isMac } from '../src/environment'

describe('Environment', () => {
  test('isBrowser', () => {
    expect(isBrowser()).toBe(true)
  })
  test('isMac', () => {
    Object.defineProperty(window.navigator, 'platform', {
      get: () => 'mac'
    })
    expect(isMac()).toBe(true)
  })
})
