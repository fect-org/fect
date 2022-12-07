import { mount } from '@vue/test-utils'
import { Element, ScaleElement } from './fixtures/elements'

describe('Scale', () => {
  it('normal', () => {
    const wrapper = mount(Element, {
      props: {
        type: 'classic'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('scale', () => {
    const wrapper = mount(ScaleElement, {
      props: {
        type: 'normal',
        marginRight: 30,
        marginLeft: 20
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('importance', () => {
    const wrapper = mount(ScaleElement, {
      props: {
        type: 'normal',
        marginRight: 0,
        mr: 50,
        marginLeft: 20
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mr').text()).toBe('calc(50 * 16px')
  })
  it('specified value', () => {
    const wrapper = mount(ScaleElement, {
      props: {
        type: 'normal',
        marginRight: '100px',
        marginLeft: 20
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mr').text()).toBe('100px')
  })
  it('scale coefficient', () => {
    const wrapper = mount(ScaleElement, {
      props: {
        scale: 0,
        marginRight: 30,
        marginLeft: 20,
        type: 'normal'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mr').text()).toBe('calc(15 * 16px')
  })
  it('preset value', () => {
    const wrapper = mount(ScaleElement, {
      props: {
        type: 'normal',
        marginLeft: 20
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mr').text()).toBe('20px')
  })
  test('stand', () => {
    const wrapper = mount(ScaleElement, {
      props: {
        type: 'normal'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.ml').text()).toBe('calc(1 * 16px)')
  })
})
