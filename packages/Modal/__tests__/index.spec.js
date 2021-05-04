import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Modal from '../modal'

describe('Modal', () => {
  it('should be render as element', () => {
    const wrapper = mount(Modal, {
      props: {
        visible: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('props should be supported', () => {
    const wrapper = mount(Modal, {
      props: {
        title: 'Test Modal',
        cancel: 'Cancel',
        done: 'Done',
        visible: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.modal_title').text()).toBe('Test Modal')
    expect(wrapper.findAll('.modal_action__btn')[0].text()).toBe('Cancel')
    expect(wrapper.findAll('.modal_action__btn')[1].text()).toBe('Done')
  })
  it('should support slot to define custom title and action ', () => {
    const wrapper = mount({
      setup() {
        return {
          customSlots: {
            title: 'Custom Title',
            action: <h3>Custom Action</h3>,
          },
        }
      },
      render() {
        return <Modal v-slots={this.customSlots} visible={true}></Modal>
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-modal_title__container').text()).toBe(
      'Custom Title',
    )
    expect(wrapper.find('h3').text()).toBe('Custom Action')
  })
  it('should be close modal through props visible value is false', async () => {
    const wrapper = mount({
      setup() {
        const show = ref(false)
        const handlerClick = () => (show.value = true)
        return { show, handlerClick }
      },
      render() {
        return (
          <div>
            <button id="btn" onClick={this.handlerClick}>
              Button
            </button>
            <Modal title="Test" v-model={[this.show, 'visible']}></Modal>
          </div>
        )
      },
    })
    const btn = wrapper.find('#btn')
    expect(wrapper.vm.show).toBe(false)
    await btn.trigger('click')
    expect(wrapper.vm.show).toBe(true)
    await expect(wrapper.findAll('.modal_action__btn')[0].trigger('click'))
    expect(wrapper.vm.show).toBe(false)
  })
})
