import { mount } from '@vue/test-utils'
import Switch from '../index'

describe('Switch', () => {
  it('should be render as element', () => {
    const swtich = mount(Switch)
    expect(swtich.html()).toMatchSnapshot()
    expect(() => swtich.unmount()).not.toThrow()
  })

  it('should be support different sizes', () => {
    const wrapper = mount({
      setup() {
        return { sizesList: ['mini', 'small', 'medium', 'large'] }
      },
      render(h) {
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
    const el = wrapper.find('.fect-swtich-slider')
    expect(el.classes('disabled')).toBe(true)
  })

  it('should emit event change', async () => {
    const wrapper = mount(<Switch />)
    const el = wrapper.find('.fect-swtich-slider')
    expect(el.classes('checked')).toBe(false)
    await wrapper.find('[type="checkBox"]').trigger('change')
    expect(el.classes('checked')).toBe(true)
  })
})
