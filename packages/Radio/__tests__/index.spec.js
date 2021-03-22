import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Radio from '../index'

describe('Radio', () => {
  it('should be render as element', () => {
    const radio = mount(Radio, { props: { value: 'test' } })
    expect(radio.html()).toMatchSnapshot()
    expect(() => radio.unmount()).not.toThrow()
  })

  it('should be support disabled', () => {
    const wrapper = mount(<Radio value={'test'} disabled />)

    expect(wrapper.props('disabled')).toBeTruthy()
  })

  it('should be support different sizes', () => {
    const wrapper = mount({
      setup() {
        return { sizeList: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizeList.map((item, i) => (
              <Radio size={item} key={i} value={item} />
            ))}
          </>
        )
      },
    })

    const els = wrapper.findAll('.fect-radio')
    expect(els[0].attributes('style')).toBe('--radioSize: 12px;')
    expect(els[1].attributes('style')).toBe('--radioSize: 14px;')
    expect(els[2].attributes('style')).toBe('--radioSize: 16px;')
    expect(els[3].attributes('style')).toBe('--radioSize: 18px;')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support cheked', () => {
    const wrapper = mount(<Radio value={'test'} checked={true} />)
    expect(wrapper.html()).toContain(
      '<span class="fect-radio-point  active"></span>',
    )
    expect(wrapper.vm.checked).toBeTruthy()
  })

  it('should  emit change event', async () => {
    const wrapper = mount({
      setup() {
        return { state: ref(0) }
      },
      render() {
        return (
          <Radio value={this.state} onChange={() => (this.state = 1)}>
            state: {this.state}
          </Radio>
        )
      },
    })

    wrapper.trigger('change')
    expect(wrapper.emitted('change').length).toEqual(1)
    expect(wrapper.html()).toContain('state: 0')
    await wrapper.find('[type="radio"]').trigger('change')
    expect(wrapper.html()).toContain('state: 1')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
