import { mount } from '@vue/test-utils'
import Tag from '..'

const Wrapper = {
  components: {
    [Tag.name]: Tag
  },
  data() {
    return {
      invert: false,
      type: 'default',
      text: 'hello world',
      color: '',
      round: false
    }
  },
  template: `
   <div class="container">
    <fe-tag :useInvert="invert" :type="type" :text="text" :type-data="type" :color="color" :round="round" />
   </div>
  `
}

describe('Tag', () => {
  it('should render as a element', () => {
    const wrapper = mount(Tag)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('component props should be work correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ type: 'success' })
    const el = wrapper.find('.fect-tag')
    expect(el.attributes('type-data')).toBe('success')
    await wrapper.setData({ invert: true })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('custom color should be work correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ color: '#336699' })
    const el = wrapper.find('.fect-tag')
    expect(el.attributes('style')).toContain('#336699')
  })
})
