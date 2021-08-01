import { mount } from '@vue/test-utils'

import Tabs from '../index'
import Tab from '../../tab'

describe('Tabs', () => {
  it('should be render as element', () => {
    const wrapper = mount(Tabs)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be change acitve value when tab trigger', async () => {
    const wrapper = await mount({
      render() {
        return (
          <Tabs v-model={[this.active, ['active']]}>
            <Tab title="HTML">HTML</Tab>
            <Tab title="JS">JS</Tab>
          </Tabs>
        )
      },
      data() {
        return {
          active: 0,
        }
      },
    })
    const els = wrapper.findAll('.fect-tabs__title') // filter all tabs title
    await els[1].trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be disabled all events', async () => {
    const wrapper = await mount({
      render() {
        return (
          <Tabs v-model={[this.active, ['active']]} hideDivider={false}>
            <Tab title="HTML" disabled={this.disabled}>
              HTML
            </Tab>
            <Tab title="JS">JS</Tab>
          </Tabs>
        )
      },
      data() {
        return {
          active: 0,
          disabled: true,
        }
      },
    })
    const els = wrapper.findAll('.fect-tabs__title') // filter all tabs title
    await els[0].trigger('click')
    await wrapper.setProps({
      hideDivider: true,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Tab can not render without Tabs', () => {
    const wrapper = mount(Tab)
    expect(() => wrapper.get('div')).toThrowError()
  })
})
