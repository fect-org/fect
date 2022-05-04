import { mount } from '@vue/test-utils'
import { Switch, SwitchEvent } from '..'

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
  it('switch should support control data flow by manual', async () => {
    let state: unknown
    const switchChangeHandler = (e: SwitchEvent) => {
      state = e.target.checked
    }
    const wrapper = mount(Switch, {
      props: {
        value: true,
        onChange: switchChangeHandler
      }
    })
    expect(wrapper.find('.fect-switch--checked').exists()).toBe(true)
    const el = wrapper.find('.fect-switch')
    await el.trigger('click')
    expect(state).toBe(false)
  })

  it('update modelValue', async () => {
    const wrapper = mount({
      components: {
        [Switch.name]: Switch
      },
      data() {
        return {
          val: false
        }
      },
      template: `<div class="container">
       <fe-switch v-model="val"  />
      </div>`
    })
    expect(wrapper.find('.fect-switch--checked').exists()).toBe(false)
    await wrapper.setData({ val: true })
    expect(wrapper.find('.fect-switch--checked').exists()).toBe(true)
  })
})
