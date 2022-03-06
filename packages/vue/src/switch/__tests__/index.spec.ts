import { mount } from '@vue/test-utils'
import Switch from '..'

const Wrapper = {
  components: {
    [Switch.name]: Switch
  },
  data() {
    return {
      val: '',
      checked: 2,
      size: 'medium',
      disabled: false,
      inactive: 3
    }
  },
  template: `<div class="container">
   <fe-switch v-model="val" 
   :checked-value="checked" 
   :size="size" 
   :disabled="disabled" 
   :inactive-value="inactive" />
  </div>`
}

describe('Switch', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Switch)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('component props should be work correctly', async () => {
    const wrapper = mount(Wrapper)
    const el = wrapper.find('.fect-switch')
    await el.trigger('click')
    expect(wrapper.vm.val).toBe(2)
    await el.trigger('click')
    expect(wrapper.vm.val).toBe(3)
    await wrapper.setData({ disabled: true, size: 'mini' })
    await el.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
