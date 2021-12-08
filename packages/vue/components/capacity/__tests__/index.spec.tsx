import { mount } from '@vue/test-utils'
import Capacity from '../index'

describe('Capacity', () => {
  it('should be render as element', () => {
    const capacity = mount(Capacity)
    expect(() => capacity.unmount()).not.toThrow()
  })

  it('should render title attrs', async () => {
    const wrapper = mount({
      render() {
        return <Capacity value="40" />
      }
    })
    const el = wrapper.find('.fect-capacity')
    expect(el.attributes('title')).toBe('40%')
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({
      value: 80
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should support custom color', () => {
    const wrapper = mount({
      render() {
        return <Capacity value={'30'} color="pink" />
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
