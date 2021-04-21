import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import CheckboxGroup from '../index'
import Checkbox from '../../CheckBox'
describe('CheckboxGroup', () => {
  it('should be render as element', () => {
    const el = mount(<CheckboxGroup />)
    expect(() => el.unmount()).not.toThrow()
  })

  it('should be support useRow', () => {
    const el = mount(<CheckboxGroup useRow />)
    expect(el.find('.useRow').exists()).toBe(true)
    expect(el.html()).toMatchSnapshot()
  })
  it('should support global size control', () => {
    const wrapper = mount({
      render() {
        return (
          <>
            <CheckboxGroup size={'mini'}>
              <Checkbox />
            </CheckboxGroup>
          </>
        )
      },
    })
    const el = wrapper.find('.fect-checkbox')
    expect(el.attributes('style')).toBe('--checkboxSize: 12px;')
  })

  it('should use v-model to control all checkbox', async () => {
    const wrapper = mount({
      setup() {
        const parent = ref(['xiamen', 'shanghai'])
        return { parent }
      },
      render(h) {
        return (
          <CheckboxGroup v-model={this.parent}>
            {this.parent.map((p, idx) => (
              <Checkbox label={p}>{idx}</Checkbox>
            ))}
          </CheckboxGroup>
        )
      },
    })
    const els = wrapper.findAll('[type="checkbox"]')
    expect(wrapper.vm.parent).toEqual(['xiamen', 'shanghai'])
    await els[0].trigger('change')
    expect(wrapper.vm.parent).toEqual(['shanghai'])
    await els[1].trigger('change')
    expect(wrapper.vm.parent).toEqual([])
  })
})
