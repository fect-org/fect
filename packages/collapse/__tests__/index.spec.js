import { mount } from '@vue/test-utils'
import Collapse from '../index'

describe('Collapse', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Collapse)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support title and subtitle', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'HTML',
        subtitle: 'HyperText Markup Language',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('h3').text()).toBe('HTML')
    expect(wrapper.find('.subtitle').text()).toBe('HyperText Markup Language')
  })
  it('should be support subTag and shadow mode', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'HTML',
        subtitle: 'HyperText Markup Language',
        subTag: 'code',
        shadow: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('code')).toBeTruthy()
    expect(wrapper.find('.fect-collapse--shadow')).toBeTruthy()
  })

  it('should be tigger click', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'HTML',
        visible: false,
      },
    })

    await wrapper.find('.fect-collapse__view').trigger('click')
    expect(wrapper.find('.fect-collapse__expand').attributes('style')).toBe(
      'visibility: hidden; height: 0px;',
    )
  })
})
