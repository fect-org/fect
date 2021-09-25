import BackTop from '..'
import { mount } from '@vue/test-utils'

const Wrapper = {
  components:{
    [BackTop.name]:BackTop,
  },
  data(){
    return {
      right: 50,
      bottom: 50,
      visibilityHeight: 10,
    }
  },
  template:`<div class="container" ref="scrollTarget" style="height: 100px; overflow: auto">
    <div style="height: 10000px; width: 100%;">
      <fe-back-top :right="right" :bottom="bottom" :visibilityHeight="visibilityHeight" >
        Custom Context
      </fe-back-top>
    </div>
  </div>`,
}

describe('BackTop', () => {
  it('should be render as element', () => {
    const wrapper = mount(BackTop, { 
      props: {
        visibilityHeight: 10,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should support props right and bottom',async () => {
    const wrapper = mount(Wrapper)
    const el = wrapper.find('.fect-back-top')
    expect(el.attributes('style')).toBe(
      'right: 50px; bottom: 50px;',
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support custom slots',async () => {
    const wrapper = mount(Wrapper)
    // const el = wrapper.find('.fect-back-top')
    // expect(el.text()).toBe('')
    // const refs = wrapper.vm.$refs as any
    // refs.scrollTarget.scrollTop = 2000
    // await new Promise(resolve => setTimeout(() => resolve(1), 50))
    // expect(el.text()).toBe('Custom Context')
    // await el.trigger('click')
    // expect(el.text()).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
