import { mount } from '@vue/test-utils'
import Image from '../index'
import { later } from '../../../tests'

const BASE_IMG_URL = 'http://img.com'

describe('Image', () => {
  it('should be render as element', () => {
    const img = mount(Image)
    expect(img.html()).toMatchSnapshot()
    expect(() => img.unmount()).not.toThrow()
  })
  it('should  support skeleton', async () => {
    const wrapper = mount(Image, {
      props: {
        skeleton: true,
        height: '240px',
        width: '540px',
        src: BASE_IMG_URL,
        maxDelay: 500000
      }
    })
    await later()
    expect(wrapper.find('.fect-skeleton').exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should destroy skeleton when time end.', async () => {
    const wrapper = mount(Image, {
      props: {
        skeleton: true,
        height: '240px',
        width: '540px',
        src: BASE_IMG_URL,
        maxDelay: 'true'
      }
    })
    await later(3000)
    expect(wrapper.find('.fect-skeleton').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
