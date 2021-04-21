import { mount } from '@vue/test-utils'
import Checkbox from '../index'
import { ref } from 'vue'

describe('Checkbox', () => {
  it('should be render as element', () => {
    const checkbox = mount(<Checkbox>CheckBox</Checkbox>)
    expect(() => checkbox.unmount()).not.toThrow()
  })
  it('should support different sizes ', () => {
    const wrapper = mount({
      setup() {
        return { sizes: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizes.map((size, idx) => (
              <Checkbox key={idx} size={size}>
                {idx}
              </Checkbox>
            ))}
          </>
        )
      },
    })
    const els = wrapper.findAll('.fect-checkbox')
    expect(els[0].attributes('style')).toBe('--checkboxSize: 12px;')
    expect(els[1].attributes('style')).toBe('--checkboxSize: 14px;')
    expect(els[2].attributes('style')).toBe('--checkboxSize: 16px;')
    expect(els[3].attributes('style')).toBe('--checkboxSize: 18px;')
  })

  it('should  support modelValue', async () => {
    const wrapper = mount({
      setup() {
        const v = ref(true)
        return { v }
      },
      render() {
        return (
          <>
            <Checkbox v-model={this.v} />
          </>
        )
      },
    })
    expect(wrapper.find('svg').attributes('isChecked')).toBe('true')
    await wrapper.find('[type="checkbox"]').trigger('change')
    expect(wrapper.find('svg').attributes('isChecked')).toBe('false')
  })

  it('should support disabled', () => {
    const wrapper = mount(<Checkbox disabled />)
    expect(wrapper.findAll('.disabled').length > 0).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
