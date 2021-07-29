import { mount } from '@vue/test-utils'
import Switch from '../index'
import { ref } from 'vue'

describe('Switch', () => {
  it('should be render as element', () => {
    const _switch = mount(Switch)
    expect(_switch.html()).toMatchSnapshot()
    expect(() => _switch.unmount()).not.toThrow()
  })

  it('should be support different sizes', () => {
    const wrapper = mount({
      setup() {
        return { sizesList: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizesList.map((item) => (
              <Switch size={item} key={item} />
            ))}
          </>
        )
      },
    })
    const els = wrapper.findAll('.fect-switch')
    expect(wrapper.html()).toMatchSnapshot()
    expect(els[0].classes('mini')).toBe(true)
    expect(els[1].classes('small')).toBe(true)
    expect(els[2].classes('medium')).toBe(true)
    expect(els[3].classes('large')).toBe(true)
  })

  it('should be support disbaled', () => {
    const wrapper = mount(<Switch disabled={true} />)
    const el = wrapper.find('.fect-switch__slider')
    expect(el.classes('disabled')).toBe(true)
  })

  it('should emit event change', async () => {
    const checked = ref(0)
    const wrapper = mount(Switch, {
      props: {
        modelValue: checked,
      },
    })
    expect(wrapper.vm.modelValue).toBe(0)
    await wrapper.find('.fect-switch').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)
    await wrapper.setProps({ modelValue: true })
    await wrapper.find('.fect-switch').trigger('click')
    expect(wrapper.emitted('update:modelValue')[1][0]).toBe(false)
  })

  it('should be support custom active and inactive value', async () => {
    const wrapper = mount(Switch)
    expect(wrapper.vm.checkedValue).toBe(true)
    expect(wrapper.vm.inactiveValue).toBe(false)
    await wrapper.setProps({
      checkedValue: 1,
      inactiveValue: 2,
    })
    expect(wrapper.vm.checkedValue).toBe(1)
    expect(wrapper.vm.inactiveValue).toBe(2)
  })
})
