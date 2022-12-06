import Checkbox from '../../checkbox'
import { mount } from '@vue/test-utils'

describe('Checkbox', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Checkbox)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support modelVaue to control initial checked', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be disabled all event when set props disabled', async () => {
    const wrapper = mount({
      components: {
        [Checkbox.name]: Checkbox
      },
      data() {
        return { disabled: true }
      },
      template: `
      <div class="container">
        <fe-checkbox :disabled="disabled"></fe-checkbox>
      </div>
      `
    })

    const el = wrapper.find('input')
    await el.trigger('change')
    expect(wrapper.emitted('change')).toBeFalsy()
    await wrapper.setData({ disabled: false })
    await el.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
