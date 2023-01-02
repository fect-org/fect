import { mount } from '@vue/test-utils'
import Avatar from '..'

const BASE_IMG_URL = 'http://img.com'

describe('Avatar', () => {
  it('render normal', () => {
    const wrapepr = mount(Avatar)
    expect(() => wrapepr.unmount()).not.toThrow()
  })
  it('img', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: BASE_IMG_URL
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('text', () => {
    const wrapper = mount(Avatar, {
      props: {
        text: 'kanno'
      }
    })
    expect(wrapper.find('span').text()).toBe('kan')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('safe text', () => {
    const wrapper = mount(Avatar, {
      props: {
        text: 123 as unknown as string
      }
    })
    expect(wrapper.find('span').text()).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('scale', () => {
    const wrapper = mount(Avatar, {
      props: {
        h: 3,
        text: 'S'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('square', () => {
    const wrapper = mount(Avatar, {
      props: {
        isSquare: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('stacked', () => {
    const wrapper = mount(Avatar, {
      props: {
        stacked: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
