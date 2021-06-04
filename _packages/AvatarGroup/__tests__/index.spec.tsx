import { mount } from '@vue/test-utils'
import AvatarGroup from '../index'
import Avatar from '../../Avatar'

const NUMBER_COUNT = 10

describe('AvatarGroup', () => {
  it('should be render as Element', () => {
    const group = mount(AvatarGroup, {})
    expect(group.html()).toMatchSnapshot()
  })

  it('shoudle be avatar container and should work', () => {
    const wrapper = mount({
      setup(props) {
        return {
          list: ['a', 'b', 'c', 'd'],
        }
      },
      render() {
        return (
          <AvatarGroup count={NUMBER_COUNT}>
            {this.list.map((item) => (
              <Avatar text={item} stacked></Avatar>
            ))}
          </AvatarGroup>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.find('.fect-ava-counter').text()).toBe('+10')

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
