import Tag from '../index'
import { mount } from '@vue/test-utils'

describe('Tag', () => {
  it('should be render as element', () => {
    const wrapper = mount(Tag, {
      props: {
        text: 'Test',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
