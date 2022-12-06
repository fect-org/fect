import Code from '../index'
import { mount } from '@vue/test-utils'

const mockWindowQuery = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
}

describe('Code', () => {
  it('should be render as element', () => {
    mockWindowQuery()
    const wrapper = mount(Code)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should support props block', () => {
    mockWindowQuery()
    const wrapper = mount(Code, {
      props: {
        block: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('pre')).toBeTruthy()
  })
})
