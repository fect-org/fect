import { mount } from '@vue/test-utils'
import BreadcrumbsItem from '../index'

describe('BreadcrumbsItem', () => {
  it('should render as element', () => {
    const breadcrumbsItem = mount(<BreadcrumbsItem />)
    expect(() => breadcrumbsItem.unmount()).not.toThrow()
  })
  it('when component have not to or href,it should render as span', () => {
    const wrapper = mount(<BreadcrumbsItem />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-braed_item').html()).toBe(
      '<span class="fect-braed_item"><!----><div class="fect-bread_separator"><!----></div></span>',
    )
  })
})
