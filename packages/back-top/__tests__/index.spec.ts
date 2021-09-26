import BackTop from '..'
import { mount, flushPromises } from '@vue/test-utils'
import { later } from '../../../tests'

const CustomWrapper = {
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
      <fe-back-top ref="target" :right="right" :bottom="bottom" :visibilityHeight="visibilityHeight" >
        Custom Context
      </fe-back-top>
    </div>
  </div>`,
}

const Wrapper = {
  components:{
    [BackTop.name]:BackTop,
  },
  data(){
    return {
      duration: 1,
      right: 50,
      bottom: 50,
    }
  },
  template:`<div class="container" ref="scrollTarget" style="height: 100px; overflow: auto">
    <div style="height: 10000px; width: 100%;">
      <fe-back-top ref="target" :target="() => $refs.scrollTarget" :duration="duration" :right="right" :bottom="bottom" :visibilityHeight="visibilityHeight" >
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
  it('should support props right and bottom', () => {
    const wrapper = mount(BackTop, { 
      props: {
        right: 50,
        bottom: 50,
        visibilityHeight: 10,
      },
    })
    const el = wrapper.find('.fect-back-top')
    expect(el.attributes('style')).toBe(
      'right: 50px; bottom: 50px;',
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support custom slots',async () => {
    const wrapper = mount(CustomWrapper)
    const el = wrapper.find('.fect-back-top')
    expect(el.text()).toBe('Custom Context')
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be support scroll visible',async () => {
    const wrapper = mount(Wrapper)
    const el = wrapper.find('.fect-back-top')
    expect(el.text()).toBe('')

    const refs = wrapper.vm.$refs as any
    const {
      target: { handleScroll },
    } = refs
    refs.scrollTarget.scrollTop = 2000
    await handleScroll({ target: refs.scrollTarget })
    await flushPromises()
    await later()
    expect(el.text()).toBe('Custom Context')

    await el.trigger('click')
    await flushPromises()
    await later()
    await handleScroll({ target: refs.scrollTarget })
    await flushPromises()
    await later()
    expect(el.text()).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
