import { mount } from '@vue/test-utils'
import AvatarGroup from '../index'
import Avatar from '../../avatar'

describe('AvatarGroup', () => {
  it('should be work as avatar container', () => {
    const wrapper = mount({
      render() {
        return (
          <AvatarGroup count="10">
            <Avatar text="a" stacked />
            <Avatar text="b" stacked />
          </AvatarGroup>
        )
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.find('.fect-avatar__counter').text()).toBe('+10')

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
