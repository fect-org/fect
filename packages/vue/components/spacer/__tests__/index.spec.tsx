import { mount } from '@vue/test-utils'

import Spacer from '../index'

describe('Spacer', () => {
  it('shoul be render as element', () => {
    const spacer = mount(Spacer)
    expect(spacer.html()).toMatchSnapshot()
  })

  it('should be support inline style', () => {
    const wrapper = mount(Spacer, {
      props: {
        inline: true,
      },
    })
    expect(wrapper.find('.fect-spacer').attributes('style')).toEqual('display: inline-block;')
  })

  it('should be support x and y', () => {
    const wrapper = mount({
      render() {
        return (
          <>
            <Spacer x={1} />
            <Spacer y={2} />
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be display right spacing when x or y are minus', () => {
    const wrapper = mount(Spacer, {
      props: {
        x: -0.5,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be display right spacing when x or y are string', () => {
    const wrapper = mount(Spacer, {
      props: {
        x: '111' as unknown as number,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
