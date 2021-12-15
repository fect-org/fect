import { mount } from '@vue/test-utils'
import Modal from '../modal'

// see : https://github.com/vuejs/vue-test-utils-next/issues/183(test for teleport)

// normal test . in future will support instrcution

const Wrapper = {
  components: {
    [Modal.name]: Modal
  },
  data() {
    return { show: false, mounted: false, overlay: true }
  },
  template: `
  <div class="container">
   <button id="btn" @click="show=true">Button</button>
    <fe-modal v-model:visible="show"
      :overlay="overlay"
      title="Test Modal"
      teleport=".container"
      cancel="Cancel"
      done="Done"
      width="500px"
      v-if="mounted" />
  </div>
  `
}

describe('Modal', () => {
  it('should be support normal props', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    await wrapper.setData({ show: true })
    await wrapper.setData({ mounted: true })
    await wrapper.setData({ overlay: false })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.title').text()).toBe('Test Modal')
    expect(wrapper.find('.fect-teleport__overlay').exists()).toBe(false)
    expect(wrapper.findAll('.fect-modal__button')[0].text()).toBe('Cancel')
    expect(wrapper.findAll('.fect-modal__button')[1].text()).toBe('Done')
    expect(() => wrapper.unmount).not.toThrow()
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

    await wrapper.setData({ show: true })
    await wrapper.setData({ mounted: true })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-modal__title').text()).toBe('Custom Title')
    expect(wrapper.find('h3').text()).toBe('Custom Action')
    wrapper.unmount()
  })

  it('should be close modal through props visible value is false', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const btn = wrapper.find('#btn')
    await wrapper.setData({ mounted: true })
    await btn.trigger('click')
    expect(wrapper.find('.fect-modal__root').isVisible()).toBe(true)
    const el = wrapper.findAll('.fect-modal__button')
    await el[0].trigger('click')
    expect(wrapper.vm.show).toBe(false)
    expect(wrapper.find('.fect-modal__root').isVisible()).toBe(false)
    await wrapper.setData({ show: true })
    await wrapper.setData({ mounted: true })
    expect(wrapper.vm.show).toBe(true)
    await wrapper.find('.fect-modal__root').trigger('click')
    expect(wrapper.vm.show).toBe(false)
    await wrapper.setData({ show: true })
    await wrapper.setData({ mounted: true })
    await wrapper.find('.fect-modal__wrapper').trigger('click')
    expect(wrapper.vm.show).toBe(true)
    wrapper.unmount()
  })
})
