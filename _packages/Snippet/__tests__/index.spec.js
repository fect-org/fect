import Snippet from '../index'
import { mount } from '@vue/test-utils'

describe('Snippet', () => {
  it('should be render as element', () => {
    const snippet = mount(<Snippet text="In Test" />)
    expect(snippet.html()).toMatchSnapshot()
    expect(() => snippet.unmount()).not.toThrow()
  })
  it('should support different types', () => {
    const wrapper = mount({
      setup() {
        return { types: ['default', 'success', 'warning', 'error'] }
      },
      render() {
        return (
          <>
            {this.types.map((type, idx) => (
              <Snippet text={idx} type={type} key={idx} />
            ))}
          </>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.default')).toBeTruthy()
    expect(wrapper.find('.success')).toBeTruthy()
    expect(wrapper.find('.warning')).toBeTruthy()
    expect(wrapper.find('.error')).toBeTruthy()
  })

  it('should support custom symbol ', () => {
    const wrapper = mount(<Snippet symbol="custom" text="inTest" />)
    expect(wrapper.find('span').text()).toBe('custominTest')
  })
  it('should support no copy', () => {
    const wrapper = mount(<Snippet copy="prevent" text="inTest" />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-snippet_copy').exists()).toBe(false)
  })
})
