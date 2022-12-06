import { mount } from '@vue/test-utils'
import { later } from '../../../tests'
import Tabs from '../index'
import Tab from '../../tab'

describe('Tabs', () => {
  it('should be render as element', () => {
    const wrapper = mount(Tabs)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be change acitve value when tab trigger', async () => {
    const wrapper = mount({
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
          active: 0
        }
      }
    })
    await later()
    const els = wrapper.findAll('.fect-tabs__title') // filter all tabs title
    await els[1].trigger('mouseenter')
    expect(wrapper.find('.fect-tabs__highlight--active')).toBeTruthy()
    const headerEl = wrapper.find('header')
    await headerEl.trigger('mouseleave')
    await els[1].trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be disabled all events', async () => {
    const wrapper = mount({
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
          disabled: true
        }
      }
    })
    await later()
    const els = wrapper.findAll('.fect-tabs__title') // filter all tabs title
    await els[0].trigger('click')
    await wrapper.setProps({
      hideDivider: true
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Tab can not render without Tabs', () => {
    const wrapper = mount(Tab)
    expect(() => wrapper.get('div')).toThrowError()
  })
  it('Tabs can use slots label custom tab title', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: () => {
          return (
            <>
              <Tab v-slots={{ label: () => <div>Custom</div> }}>HTML</Tab>
              <Tab>JS</Tab>
            </>
          )
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('when user change props active should be reRender', async () => {
    const wrapper = mount({
      render() {
        return (
          <Tabs v-model={[this.active, ['active']]} hideDivider={false}>
            <Tab title="HTML">HTML</Tab>
            <Tab title="JS">JS</Tab>
          </Tabs>
        )
      },
      data() {
        return {
          active: 0
        }
      }
    })
    await later()
    const titleOne = wrapper.find('.fect-tabs__title')
    expect(titleOne.attributes('class')).toContain('fect-tabs__title fect-tabs__title--active')
    await wrapper.setProps({ active: 1 })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
