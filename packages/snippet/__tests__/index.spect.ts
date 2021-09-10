import { mount } from '@vue/test-utils'
import Snippet from '..'

const Wrapper = {
  components: {
    [Snippet.name]: Snippet,
  },
  data: () => ({
    text: 'Test',
    width: '200px,',
    fill: false,
    type: 'default',
    copy: 'default',
    symbol: '$',
    toastText: 'Copied to clipboard!',
    toastType: 'success',
  }),
  template: `
  <div class="container">
    <fe-snippet :text="text" :width="width" 
    :fill="fill"
    :type="type"
    :copy="copy"
    :symbol="symbol"
    :toastText="toastText"
    :toastType="toastType"
    />
  </div>
  `,
}

describe('Snippet', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Wrapper)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('component props should work correctly', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({
      fill: true,
      type: 'success',
    })
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({
      copy: 'prevent',
    })
    expect(wrapper.find('.fect-snippet_copy').exists()).toBe(false)
    await wrapper.setData({
      copy: 'default',
    })
  })
})
