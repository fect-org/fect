import { mount } from '@vue/test-utils'
import { Tooltip } from '..'

describe('Tooltip', () => {
  it('should be support slots content', () => {
    const wrapper = mount(Tooltip, {
      slots: {
        content: <div>test message</div>,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
