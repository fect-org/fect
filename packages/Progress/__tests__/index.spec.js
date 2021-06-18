import Progress from '../index'
import { mount } from '@vue/test-utils'

describe('Progress', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Progress)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support different types', () => {
    const types = ['default', 'success', 'warning', 'error']
    const _default = mount(<Progress type={types[0]} value={10} />)
    const _success = mount(<Progress type={types[1]} value={10} />)
    const _warning = mount(<Progress type={types[2]} value={10} />)
    const _error = mount(<Progress type={types[3]} value={10} />)
    expect(_default.html()).toMatchSnapshot()
    expect(_success.html()).toMatchSnapshot()
    expect(_warning.html()).toMatchSnapshot()
    expect(_error.html()).toMatchSnapshot()
  })

  it('props colors should be work', () => {
    const colors = {
      20: 'red',
      40: 'blue',
    }
    const wrapper = mount(<Progress value={20} colors={colors} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
