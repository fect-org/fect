import { mount } from '@vue/test-utils'
import BreadcrumbsItem from '../index'
import Breadcrumbs from '../../breadcrumbs'

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
    expect(wrapper.find('.fect-breadcrumbs__item').html()).toBe(
      '<span class="fect-breadcrumbs__item"><!----><div class="fect-breadcrumbs__separator">/</div></span>',
    )
  })
})
