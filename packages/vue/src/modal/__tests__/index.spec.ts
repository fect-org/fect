import { mount } from '@vue/test-utils'
import Modal from '../modal'

// see : https://github.com/vuejs/vue-test-utils-next/issues/183(test for teleport)

// normal test . in future will support instrcution

const Wrapper = {
  components: {
    [Modal.name]: Modal
  },
  data() {
    return { show: false, mounted: false, overlay: true, disableOverlayClick: false }
  },
  template: `
  <div class="container">
   <button id="btn" @click="show=true">Button</button>
    <fe-modal v-model:visible="show"
      :overlay="overlay"
      title="Test Modal"
      teleport=".container"
      :disable-overlay-click="disableOverlayClick"
      cancel="Cancel"
      done="Done"
      width="500px"
      v-if="mounted" />
  </div>
  `
}

describe('Modal', () => {
  it('should be render as a element', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    await wrapper.setData({ show: true, mounted: true })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount).not.toThrow()
    wrapper.unmount()
  })
  it('modal props should be work correctly', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const rootEl = () => wrapper.find('.fect-modal__root')
    await wrapper.setData({ mounted: true, overlay: false, disableOverlayClick: true })
    const btn = wrapper.find('#btn')
    await btn.trigger('click')
    expect(wrapper.find('.fect-teleport__overlay').exists()).toBe(false)
    expect(wrapper.find('.fect-modal__root').isVisible()).toBe(true)
    await rootEl().trigger('click')
    expect(wrapper.find('.fect-modal__root').isVisible()).toBe(true)
    await wrapper.setData({ disableOverlayClick: false })
    const actionBtns = wrapper.findAll('.fect-modal__button')
    await actionBtns[0].trigger('click')
    expect(wrapper.vm.show).toBe(false)
    await btn.trigger('click')
    await rootEl().trigger('click')
    expect(wrapper.vm.show).toBe(false)
    await btn.trigger('click')
    await wrapper.find('.fect-modal__title').trigger('click')
    expect(wrapper.vm.show).toBe(true)
    wrapper.unmount()
  })
  it('should be support custom slots', async () => {
    const wrapper = mount(
      {
        components: {
          [Modal.name]: Modal
        },
        data() {
          return { show: false, mounted: false }
        },
        template: `
        <div class="container">
          <fe-modal v-model:visible="show" teleport=".container" v-if="mounted">
            <template #title>Custom Title</template>
            <template #action>
              <h3>Custom Action</h3>
            </template>
          </fe-modal>
        </div>
      `
      },
      { attachTo: document.body }
    )

    await wrapper.setData({ show: true, mounted: true })
    expect(wrapper.find('.fect-modal__title').text()).toBe('Custom Title')
    expect(wrapper.find('h3').text()).toBe('Custom Action')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
