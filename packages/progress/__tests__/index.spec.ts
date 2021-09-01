import { mount } from '@vue/test-utils'
import Progress from '../index'

const Wrapper = {
  components: {
    [Progress.name]: Progress,
  },
  data() {
    return {
      type: 'default',
      value: 10,
      colors: {},
    }
  },
  template: `
   <div class="container">
     <fe-progress :type="type" :value="value" :colors="colors" :type-data="type" />
   </div>
  `,
}

describe('Progress', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Progress)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('component props should work correctly', async () => {
    const wrapper = mount(Wrapper)
    const el = wrapper.find('.fect-progress__inner')
    expect(el.attributes('type-data')).toBe('default')
    await wrapper.setData({ type: 'success' })
    expect(el.attributes('type-data')).toBe('success')
    await wrapper.setData({ type: 'warning' })
    expect(el.attributes('type-data')).toBe('warning')
    await wrapper.setData({ type: 'error' })
    expect(el.attributes('type-data')).toBe('error')
    await wrapper.setData({ value: 20 })
    expect(el.attributes('style')).toBe('width: 20.00%;')
    await wrapper.setData({ value: 110 })
    expect(el.attributes('title')).toBe('100%')
    await wrapper.setData({ value: -1 })
    expect(el.attributes('title')).toBe('0%')
    await wrapper.setData({ value: 'test' })
    expect(el.attributes('title')).toBe('0.00%')
    await wrapper.setData({
      colors: {
        20: 'red',
        40: 'blue',
      },
      value: 20,
    })
    await wrapper.setData({ value: 60 })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
