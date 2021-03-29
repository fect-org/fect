import { mount } from '@vue/test-utils'
import Col from '../index'

describe('Col', () => {
  it('should be render as Element', () => {
    const col = mount(Col)
    expect(col.html()).toMatchSnapshot()
    expect(() => col.unmount()).not.toThrow()
  })

  it('should be support tag', () => {
    const wrapper = mount(<Col tag="span"></Col>)
    expect(wrapper.find('span')).toBeTruthy()
  })
})
