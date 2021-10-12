/**
 *  how to test vuejs props default as  a function .
 * see : https://stackoverflow.com/questions/64434035/testing-vuejs-prop-default-that-is-anonymous-function-in-jest
 */

import BackTop from '..'
import { mount, flushPromises } from '@vue/test-utils'
import { later } from '../../../tests'

const Wrapper = (slots?: any) => {
  return {
    components: {
      [BackTop.name]: BackTop,
    },
    data: () => ({
      right: 50,
      bottom: 50,
      visibilityHeight: 10,
    }),
    template: `<div class="container" ref="container" style="height:500px;">
      <fe-backTop ref="backTopRef" :target="()=>$refs.container" :right="right" :bottom="bottom" :visibilityHeight="visibilityHeight">
        ${slots}
      </fe-backTop>
    </div>`,
  }
}

describe('BackTop', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Wrapper(), { attachTo: document.body })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('normal props and slots should work correctly', () => {
    // fect-back-top__icon
    const wrapper = mount(Wrapper('test'), { attachTo: document.body })
    const el = wrapper.find('.fect-back-top')
    expect(el.attributes('style')).toBe('right: 50px; bottom: 50px;')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('scroll event should be work', async () => {
    const wrapper = mount(Wrapper(), { attachTo: document.body })
    await wrapper.setData({
      visibilityHeight: 0,
    })

    const {
      backTopRef: { handleScroll },
    } = wrapper.vm.$refs as any
    await handleScroll(wrapper.vm.$refs.container)
    // wrapper.
    await flushPromises()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })
})
