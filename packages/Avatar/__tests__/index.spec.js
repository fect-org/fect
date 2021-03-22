import { mount } from '@vue/test-utils'

import Avatar from '../index'

const BASE_IMG_URL = 'http://img.com'

describe('Avatr', () => {
  it('should be support square and circle', () => {
    const circle = mount(Avatar, {})
    expect(() => circle.unmount()).not.toThrow()
    const square = mount(Avatar, {
      props: {
        isSquare: true,
      },
    })
    expect(() => square.unmount()).not.toThrow()
  })

  it('should be limited 4 characters', () => {
    const ava = mount(Avatar, {
      props: {
        text: 'XeryYue',
      },
    })
    const text = ava.find('.fect-avatar-text').text()
    expect(text.length).toBeLessThanOrEqual(3)
  })

  it('should be render as Element', () => {
    const normalAva = mount(Avatar, {
      props: {
        src: BASE_IMG_URL,
        size: 'mini',
      },
    })
    expect(normalAva.html()).toMatchSnapshot()
    const textAva = mount(Avatar, {
      props: {
        text: 'test',
      },
    })
    expect(textAva.html()).toMatchSnapshot()
  })

  it('stacked should be work', () => {
    const ava = mount(Avatar, {
      props: {
        stacked: true,
      },
    })
    expect(() => ava.unmount()).not.toThrow()
  })
})
