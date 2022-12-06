import { mount } from '@vue/test-utils'
import Dot from '..'

const Wrapper = {
  components: {
    [Dot.name]: Dot
  },
  data() {
    return {
      type: 'default'
    }
  },
  template: `
     <div class="container">
       <fe-dot :type="type" :type-data="type">
        <span>success</span>
       </fe-dot>
     </div>
    `
}

describe('Dot', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Dot)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should support different type', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ type: 'success' })
    expect(wrapper.find('.fect-dot').attributes('type-data')).toBe('success')
    const el = wrapper.find('.fect-dot__ctx').find('span').text()
    expect(el).toBe('success')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
