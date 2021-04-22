import { mount } from '@vue/test-utils'
import Breadcrumbs from '../index'
import BreadcrumbsItem from '../../BreadcrumbsItem'

describe('Breadcrumbs', () => {
  it('should be render as element', () => {
    const braedcrumbs = mount(<Breadcrumbs />)
    expect(() => braedcrumbs.unmount()).not.toThrow()
  })

  it('should be support different sizes', () => {
    const wrapper = mount({
      setup() {
        return { sizes: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizes.map((size, idx) => (
              <Breadcrumbs size={size} key={idx}>
                {idx}
              </Breadcrumbs>
            ))}
          </>
        )
      },
    })

    const els = wrapper.findAll('.fect-nav_container')
    expect(els[0].attributes('style')).toBe('font-size: 12px;')
    expect(els[1].attributes('style')).toBe('font-size: 14px;')
    expect(els[2].attributes('style')).toBe('font-size: 16px;')
    expect(els[3].attributes('style')).toBe('font-size: 18px;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be support custom separator', () => {
    const wrapper = mount(
      <Breadcrumbs separator=">">
        <BreadcrumbsItem />
        <BreadcrumbsItem />
      </Breadcrumbs>,
    )
    expect(wrapper.find('.fect-bread_separator').text()).toBe('>')
  })
})
