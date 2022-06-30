import { mount } from '@vue/test-utils'
import { later, trigger } from '../../../tests'
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
  it('render normal', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    await wrapper.setData({ show: true, mounted: true })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount).not.toThrow()
    wrapper.unmount()
  })
  it('overlay', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    await wrapper.setData({ show: true, mounted: true, overlay: false })
    const hiddenableLayer = wrapper.find('.fect-backdrop__layer.hidden')
    expect(hiddenableLayer.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  it('disable overlay click', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    await wrapper.setData({ show: true, mounted: true, disableOverlayClick: true })
    const btn = wrapper.find('#btn')
    await btn.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  it('slots', async () => {
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
        <fe-modal teleport=".container" v-model:visible="show" v-if="mounted">
          <template #title>Title</template>
          <template #action>
            <h3>Action</h3>
          </template>
        </fe-modal>
       </div>
      `
      },
      { attachTo: document.body }
    )
    await wrapper.setData({ show: true, mounted: true })
    expect(wrapper.find('h3').text()).toBe('Action')
    expect(wrapper.find('.fect-modal__title').text()).toBe('Title')
    wrapper.unmount()
  })
})
