import { flushPromises, mount } from '@vue/test-utils'
import Swipe from '..'
import SwipeItem from '../../swipe-item'

describe('Swipe', () => {
  it('should be support custom render indicator', async () => {
    const slots = {
      indicator: () => <div>custom</div>,
    }

    const wrapper = mount({
      render() {
        return (
          <Swipe v-slots={slots}>
            <SwipeItem>1</SwipeItem>
            <SwipeItem>2</SwipeItem>
          </Swipe>
        )
      },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
