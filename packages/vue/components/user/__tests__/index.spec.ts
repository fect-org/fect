import { User } from '..'
import { mount } from '@vue/test-utils'

describe('User', () => {
  it('should render as normal', () => {
    const wrapper = mount(User, {
      props: {
        text: 'Kanno',
        name: 'kanno'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
