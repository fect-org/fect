import { mount } from '@vue/test-utils'
import Spacer from '..'

describe('Spacer', () => {
  it('shoul be render as element', () => {
    const spacer = mount(Spacer)
    expect(spacer.html()).toMatchSnapshot()
  })

  it('should be support inline style', () => {
    const wrapper = mount(Spacer, {
      props: {
        inline: true
      }
    })
    expect(wrapper.find('.fect-spacer--inline').exists()).toBe(true)
  })

  it('horizontal', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Spacer w={2} />
            <Spacer width={15} />
          </div>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('vertical', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Spacer h={2} />
            <Spacer height={11} />
          </div>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('float', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Spacer h={2.1} />
            <Spacer height={3.5} />
          </div>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
