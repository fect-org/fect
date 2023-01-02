import { mount } from '@vue/test-utils'
import Browser from '..'
import Image from '../../image'

const Wrapper = {
  components: {
    [Browser.name]: Browser,
    [Image.name]: Image
  },
  data() {
    return {
      invert: false,
      url: 'https://www.fect-org.com/',
      showFullLink: false,
      title: 'Fect'
    }
  },
  template: `
    <div classs="container">
      <fe-browser 
       :invert="invert"
       :url="url" 
       :showFullLink="showFullLink" 
       :title="title">
        <fe-image width="540px" height="246px" />
      </fe-browser>
    </div>
  `
}

describe('ImageBrowser', () => {
  it('should render as a element', () => {
    const wrapper = mount(Wrapper)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support invert and showFullLink', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ invert: true, showFullLink: true })
    expect(wrapper.find('.fect-image__browser')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should only render title when without url', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ url: '' })
    expect(wrapper.find('.address-input').exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should render empty when title and url is empty', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ url: '', title: '' })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('if the URL address is incorrect, the original value is displayed', async () => {
    const wrapper = mount(Wrapper)
    await wrapper.setData({ url: '123' })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
