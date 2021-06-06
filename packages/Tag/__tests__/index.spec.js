import Tag from '../index'
import { mount } from '@vue/test-utils'

describe('Tag', () => {
  it('should be render as element', () => {
    const wrapper = mount(Tag, {
      props: {
        text: 'Test',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should support different type', () => {
    const wrapper = mount({
      setup() {
        return {
          types: ['default', 'success', 'warning', 'error'],
        }
      },
      render() {
        return (
          <>
            {this.types.map((type, i) => (
              <Tag text={i} type={type} key={type} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should support invert ', () => {
    const wrapper = mount({
      setup() {
        return {
          types: ['default', 'success', 'warning', 'error'],
        }
      },
      render() {
        return (
          <>
            {this.types.map((type, i) => (
              <Tag text={i} type={type} key={type} useInvert />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
