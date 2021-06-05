import { mount } from '@vue/test-utils'
import Image from '../index'

describe('Image', () => {
  it('should be render as element', () => {
    const img = mount(Image)
    expect(img.html()).toMatchSnapshot()
    expect(() => img.unmount()).not.toThrow()
  })
  it('should  support skeleton', () => {
    const wrapper = mount(Image, {
      props: {
        skeleton: true,
      },
    })
    expect(wrapper.find('.skeleton')).toBeTruthy()
  })
})
