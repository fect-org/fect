import { mount } from '@vue/test-utils'
import Drawer from '../index'

describe('Drawer', () => {
  it('should be render as  a elemnt', () => {
    const wrapepr = mount(Drawer)
    expect(() => wrapepr.unmount()).not.toThrow()
  })
  it('should be support normal props', async () => {
    const wrapper = mount(
      {
        data() {
          return {
            show: false,
            visible: false,
            disableOverlayClick: false,
            overlay: true,
            placement: 'right',
          }
        },
        components: {
          [Drawer.name]: Drawer,
        },
        template: `
      <div class="container">
       <fe-drawer 
        :placement="placement"
        v-model="visible"
        v-if="show"
        teleport=".container"
        :overlay="overlay"
        :disable-overlay-click="disableOverlayClick"
       >
        <span>
          Test
        </span>
       </fe-drawer>
      </div>
      `,
      },
      { attachTo: document.body }
    )

    await wrapper.setData({ visible: true })
    await wrapper.setData({ show: true })
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({ overlay: false })
    expect(wrapper.find('.fect-teleport__overlay').exists()).toBe(false)
    const el = wrapper.find('.fect-drawer__root')
    await el.trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    await wrapper.setData({ visible: true })
    await wrapper.setData({ disableOverlayClick: true })
    await el.trigger('click')
    expect(wrapper.vm.visible).toBe(true)
    const dom = wrapper.find('.fect-drawer__wrapper')
    await dom.trigger('click')
    expect(wrapper.vm.visible).toBe(true)
  })
})
