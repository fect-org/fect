import { mount } from '@vue/test-utils'
import BreadcrumbsItem from '../index'
import Breadcrumbs from '../../Breadcrumbs'

describe('BreadcrumbsItem', () => {
  it('should render as element', () => {
    const breadcrumbsItem = mount(
      <Breadcrumbs>
        <BreadcrumbsItem />
      </Breadcrumbs>,
    )
    expect(() => breadcrumbsItem.unmount()).not.toThrow()
  })
  it('when component have not to or href,it should render as span', () => {
    const wrapper = mount(
      <Breadcrumbs>
        <BreadcrumbsItem />
      </Breadcrumbs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-braed_item').html()).toBe(
      '<span class="fect-braed_item"><!----><div class="fect-bread_separator">/</div></span>',
    )
  })
})
