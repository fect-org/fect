import { mount } from '@vue/test-utils'
import Progress from '..'

describe('Progress', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Progress)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('fixed', () => {
    const wrapper = mount({
      render() {
        return (
          <>
            <Progress fixedTop />
            <Progress fixedBottom />
          </>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('color', () => {
    const wrapper = mount(Progress, {
      props: {
        colors: {
          20: 'red',
          40: 'blue',
          60: 'green',
          70: 'pink'
        },
        value: 45
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(
      wrapper
        .find('.fect-progress')
        .attributes('style')
        ?.split(';')
        .find((v) => v.includes('--progress-inner-bg-color:'))
        ?.replace(/\s/, '')
    ).toEqual('--progress-inner-bg-color: green')
  })
})
