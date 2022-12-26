import { mount } from '@vue/test-utils'
import Dot from '..'

describe('Dot', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Dot)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('types', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Dot type="default" />
            <Dot type="success" />
            <Dot type="warning" />
            <Dot type="error" />
          </div>
        )
      }
    })
    expect(wrapper.findAll('.fect-dot').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
