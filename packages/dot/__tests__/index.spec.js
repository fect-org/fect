import Dot from '../index'
import { mount } from '@vue/test-utils'
describe('Dot', () => {
  it('should be render as element', () => {
    const dot = mount(Dot)
    expect(dot.html()).toMatchSnapshot()
  })

  it('should be support types', () => {
    const wrapper = mount({
      setup() {
        return { typeList: ['default', 'success', 'warning', 'error'] }
      },
      render() {
        return (
          <>
            {this.typeList.map((item) => (
              <Dot type={item} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be support slots', () => {
    const wrapper = mount({
      render() {
        return (
          <>
            <Dot type="success">
              <span>success</span>
            </Dot>
          </>
        )
      },
    })

    const el = wrapper
      .find('.fect-dot__ctx')
      .find('span')
      .text()
    expect(el).toBe('success')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
