import { mount } from '@vue/test-utils'
import Breadcrumbs from '../'
import BreadcrumbsItem from '../../breadcrumbs-item'

describe('Breadcrumbs', () => {
  it('render noraml', () => {
    const wrapepr = mount(Breadcrumbs)
    expect(() => wrapepr.unmount()).not.toThrow()
  })
  it('should be render error when breadcrumbsItem without breadcrumbs', () => {
    const wrapper = mount(BreadcrumbsItem)
    expect(() => wrapper.get('.fect-breadcrumbs__item')).toThrowError()
  })

  it('separator', () => {
    const wrapper = mount({
      render() {
        return (
          <Breadcrumbs separator="#">
            <BreadcrumbsItem href="https://www.test.com">First</BreadcrumbsItem>
            <BreadcrumbsItem>Second</BreadcrumbsItem>
          </Breadcrumbs>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
