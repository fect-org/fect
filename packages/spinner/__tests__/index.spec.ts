import { mount } from '@vue/test-utils'

import Spinner from '..'

describe('Spinner', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
