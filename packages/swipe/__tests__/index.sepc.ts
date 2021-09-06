import { mount } from '@vue/test-utils'
import Swipe from '..'
import SwipeItem from '../../swipe-item'

const Wrapper = {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      loop: false,
      autoplay: '',
      indicatorDisplay: true,
      indicatorColor: '',
      initialValue: 0,
    }
  },
  template: `
   <div class="container" >
    <fe-swipe :loop="loop" 
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
  `,
}

describe('Swipe', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Wrapper)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support custom indicator color', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ indicatorColor: 'red' })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('component props should be work correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({
      loop: true,
      indicatorDisplay: false,
      autoplay: 2000,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('component should processing boundary index correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({
      loop: true,
      autoplay: 2000,
      initialValue: 5,
    })
    const el = wrapper.find('.fect-swipe__track')
    expect(el.attributes('style')).toBe(
      'width: 1050px; transform: translateX(0px); transition-duration: 0ms;',
    )
    await wrapper.setData({ initialValue: -1 })
    expect(el.attributes('style')).toBe(
      'width: 1050px; transform: translateX(-1750px); transition-duration: 0ms;',
    )
    await wrapper.setData({ loop: false, initialValue: 1, autoplay: '' })
    const indicators = wrapper.findAll('.fect-swipe__indicator')
    await indicators[0].trigger('click')
    // expect(el.attributes('style')).toBe(
    //   'width: 1050px; transform: translateX(-700px); transition-duration: 0ms;',
    // )
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('component swipeItem should emitter a click event', async () => {
    const wrapper = mount(Wrapper)
    const els = wrapper.findAll('.fect-swipe-item')
    await els[0].trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })
})
