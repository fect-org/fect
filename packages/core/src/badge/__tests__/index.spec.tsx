import { mount } from '@vue/test-utils'
import Badge from '..'

describe('Badge', () => {
  it('render normal', () => {
    const wrapper = mount(Badge)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('type', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Badge scale={2 / 3} type="default" />
            <Badge type="secondary" />
            <Badge type="success" />
            <Badge type="warning" />
            <Badge type="error" />
          </div>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('dot', () => {
    const wrapper = mount(Badge, {
      props: {
        dot: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
