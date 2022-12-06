import { mount } from '@vue/test-utils'
import Loading from '..'

const Wrapper = {
  components: {
    [Loading.name]: Loading
  },
  data() {
    return {
      type: 'default',
      size: 'medium',
      color: '',
      loadType: 'default'
    }
  },
  template: `
   <div class="container">
     <fe-loading :type="type" 
     :size="size" :color="color" 
     :load-type="loadType" :type-data="type" :type-size="size"/>
   </div>
  `
}

describe('Loading', () => {
  it('should be rendera as a element', () => {
    const wrapper = mount(Loading)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('component props should be work correctly', async () => {
    const wrapper = mount(Wrapper)
    const loadEl = wrapper.find('.fect-loading')
    expect(loadEl.attributes('type-data')).toBe('default')
    expect(loadEl.attributes('type-size')).toBe('medium')
    await wrapper.setData({ type: 'success', size: 'small' })
    expect(loadEl.attributes('type-data')).toBe('success')
    expect(loadEl.attributes('type-size')).toBe('small')
    await wrapper.setData({ color: 'pink' })
    const el = wrapper.find('i')
    expect(el.attributes('style')).toBe('background: pink;')
    await wrapper.setData({ loadType: 'cube' })
    expect(wrapper.findAll('.fect-loading__cube')).toBeTruthy()
    await wrapper.setData({ loadType: 'circle', color: ['red', 'blue'] })
    expect(wrapper.findAll('.fect-loading__circle')).toBeTruthy()
    await wrapper.setData({ loadType: 'wave' })
    expect(wrapper.findAll('.fect-loading__wave')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
