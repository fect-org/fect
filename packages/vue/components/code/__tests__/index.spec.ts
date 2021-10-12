import Code from '../index'
import { mount } from '@vue/test-utils'

describe('Code', () => {
  it('should be render as element', () => {
    const wrapper = mount(Code)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should support props block', () => {
    const wrapper = mount(Code, {
      props: {
        block: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('pre')).toBeTruthy()
  })
})
