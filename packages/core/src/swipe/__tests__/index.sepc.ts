import { flushPromises, mount } from '@vue/test-utils'
import Swipe from '..'
import SwipeItem from '../../swipe-item'

const Wrapper = {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      loop: false,
      autoplay: 0,
      indicatorDisplay: true,
      indicatorColor: '',
      initialValue: 0
    }
  },
  template: `
   <div class="container" >
    <fe-swipe 
    :loop="loop" 
    :autoplay="autoplay" 
    :indicator-display="indicatorDisplay"
    :indicator-color="indicatorColor"
    :initial-value="initialValue"
    style="height:200px;width:350px;"
    >
      <fe-swipeItem>
        1
      </fe-swipeItem>
      <fe-swipeItem>
        2
      </fe-swipeItem>
      <fe-swipeItem>
        3
      </fe-swipeItem>
    </fe-swipe>
   </div>
  `
}

describe('Swipe', () => {
  it('should be render as a element', async () => {
    const wrapper = mount(Wrapper)
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
    wrapper.unmount()
  })
  it('should be support custom indicator color', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ indicatorColor: 'red' })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('component props should be work correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({
      loop: true,
      indicatorDisplay: false,
      autoplay: 2000
    })
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  it('component should processing boundary index correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({
      loop: true,
      autoPlay: 2000,
      initialValue: -1
    })
    await flushPromises()
    const indicators = wrapper.findAll('.fect-swipe__indicator')
    await indicators[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('component swipeItem should emitter a click event', async () => {
    const wrapper = mount(Wrapper)
    await flushPromises()
    const els = wrapper.findAll('.fect-swipe__item')
    await els[0].trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
    wrapper.unmount()
  })
  it('should support autoplay', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({
      loop: true,
      autoplay: 2000
    })
    // await flushPromises()
    // await later()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
