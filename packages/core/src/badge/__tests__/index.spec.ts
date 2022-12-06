import { mount } from '@vue/test-utils'
import Badge from '..'

const Wrapper = {
  components: {
    [Badge.name]: Badge
  },
  data() {
    return {
      type: 'default',
      dot: false,
      size: 'medium'
    }
  },
  template: `<div class="container">
   <fe-badge :type="type" :dot="dot" :size="size" :type-data="type">Badge</fe-badge>
 </div>`
}

describe('Badge', () => {
  it('should be render as a element', () => {
    const badge = mount(Badge)
    expect(() => badge.unmount()).not.toThrow()
  })
  it('should be supprot noramlize props', async () => {
    const wrapper = mount(Wrapper)
    const el = wrapper.find('.fect-badge')
    await wrapper.setData({ type: 'success' })
    expect(el.attributes('type-data')).toBe('success')
    await wrapper.setData({ size: 'large' })
    expect(el.attributes('class')).toContain('fect-badge--large')
    await wrapper.setData({ dot: true })
    expect(wrapper.find('.fect-badge__dot')).toBeTruthy()
    expect(wrapper.find('.fect-badge__dot').text()).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
