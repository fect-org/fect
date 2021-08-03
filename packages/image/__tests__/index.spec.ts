import { mount } from '@vue/test-utils'
import Image from '../index'
import { later } from '../../../tests'

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
  it('should support useBrowser', async () => {
    const wrapper = mount(Image, {
      props: {
        useBrowser: true,
        height: '240px',
        width: '540px',
      },
    })
    expect(wrapper.find('.fect-image__browser')).toBeTruthy()
    await wrapper.setProps({ url: 'https://vue.miaya.com' })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support invert browserColor', () => {
    const wrapper = mount(Image, {
      props: {
        useBrowser: true,
        height: '240px',
        width: '540px',
        invert: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support showFullLink', () => {
    const wrapper = mount(Image, {
      props: {
        useBrowser: true,
        height: '240px',
        width: '540px',
        url: 'https://vue.miaya.com',
        showFullLink: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
