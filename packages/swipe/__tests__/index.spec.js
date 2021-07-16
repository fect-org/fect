import { mount } from '@vue/test-utils'
import Swipe from '../index'
import SwipeItem from '../../swipe-item'

describe('Swipe', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Swipe)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support indicatorColor', () => {
    const wrapper = mount(
      <Swipe indicatorColor="red">
        <SwipeItem />
      </Swipe>,
    )

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support custom indicatorSize', () => {
    const wrapper = mount(
      <Swipe indicatorHeight="6px" indicatorWidth="6px">
        <SwipeItem />
      </Swipe>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
