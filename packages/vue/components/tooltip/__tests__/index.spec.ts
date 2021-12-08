import { mount } from '@vue/test-utils'
import { Tooltip } from '..'

const Wrapper = {
  components: {
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      content: 'test infomation',
      placement: 'top',
      visibleArrow: true,
      trigger: 'hover',
      showAfter: 0,
      hideAfter: 0,
      visible: false
    }
  },
  template: `<div class="container">
  <fe-tooltip 
  ref="tooltipRef"
  :content="content" 
  :placement="placement"
  :visible="visbile"
  :trigger="trigger"
  :visible-arrow="visibleArrow"
  :show-after="show-after"
  :hide-after="hide-after"
  >
    Test dom
  </fe-tooltip>
  </div>`
}

describe('Tooltip', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Test'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount).not.toThrow()
  })
  it('component props should work correctly', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      tooltipRef: { clickHandler, mouseEventHandler, setTeleport, updateRect }
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    expect(wrapper.html()).toMatchSnapshot()
    await mouseEventHandler(true)
    await updateRect()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-tooltip__inner').text()).toBe('test infomation')
    await mouseEventHandler(false)
    await wrapper.setData({
      trigger: 'click',
      visibleArrow: false,
      showAfter: 500
    })
    clickHandler(true)
    const el = wrapper.find('.fect-tooltip__content')
    await el.trigger('click')
    expect(wrapper.find('.fect-tooltip__inner').text()).toBeTruthy()
    await clickHandler(false)
    await wrapper.setData({
      trigger: 'hover',
      visible: true
    })
    await wrapper.find('.fect-tooltip').trigger('mouseleave')
    await wrapper.find('.fect-tooltip').trigger('mouseenter')
    await el.trigger('mouseenter')
    await clickHandler(false)
    wrapper.unmount()
  })

  it('should be support click or mouse event', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      tooltipRef: { setTeleport }
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const el = wrapper.find('.fect-tooltip')
    const cont = wrapper.find('.fect-tooltip__content')
    await el.trigger('mouseenter')
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-tooltip__inner').text()).toBe('test infomation')
    await cont.trigger('mouseleave')
    await wrapper.setData({ trigger: 'click' })
    await el.trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
