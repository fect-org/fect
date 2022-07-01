import { mount } from '@vue/test-utils'
import { Drawer } from '..'
import { Backdrop } from '../../backdrop'
import DrawerWrapper from '../drawer-wrapper'

/**
 * see: https://test-utils.vuejs.org/guide/advanced/teleport.html#interacting-with-the-teleported-component
 */

describe('Drawer', () => {
  beforeEach(() => {
    const container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.outerHTML = ''
  })

  it('render normal', () => {
    const wrapper = mount(Drawer, { attachTo: document.body })
    expect(() => wrapper.unmount()).not.toThrow()
    wrapper.unmount()
  })
  it('placement', () => {
    const wrapper = mount(Drawer, {
      props: {
        teleport: '#container',
        placement: 'top',
        modelValue: true
      }
    })
    const drawer = wrapper.getComponent(DrawerWrapper)
    expect(drawer.html()).toMatchSnapshot()
    expect(drawer.find('.fect-drawer__wrapper').classes()).toContain('fect-drawer__wrapper--top')
    wrapper.unmount()
  })
  it('round', () => {
    const wrapper = mount(Drawer, {
      props: {
        teleport: '#container',
        placement: 'top',
        modelValue: true,
        round: false
      }
    })
    const drawer = wrapper.getComponent(DrawerWrapper)
    expect(drawer.find('.fect-drawer__wrapper').classes()).not.toContain('fect-drawer__wrapper--round')
    expect(drawer.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  it('overlay', async () => {
    const wrapper = mount(Drawer, {
      props: {
        teleport: '#container',
        modelValue: true,
        overlay: false
      }
    })
    const backdrop = wrapper.getComponent(Backdrop)
    expect(backdrop.html()).toMatchSnapshot()
    expect(backdrop.find('.fect-backdrop__layer').classes()).toContain('hidden')
    await wrapper.setProps({
      disableOverlayClick: true
    })
    await backdrop.find('.fect-backdrop').trigger('click')
    wrapper.unmount()
  })
})
