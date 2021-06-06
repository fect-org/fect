import { mount } from '@vue/test-utils'
import Badge from '../index'

describe('Badge', () => {
  it('should be render as element', () => {
    const badge = mount(<Badge />)
    expect(() => badge.unmount()).not.toThrow()
  })
  it('should be support different types', () => {
    const wrapper = mount({
      setup() {
        return { types: ['default', 'success', 'warning', 'error'] }
      },
      render() {
        return (
          <>
            {this.types.map((type) => (
              <Badge key={type} type={type} type-data={type}>
                {type}
              </Badge>
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    const els = wrapper.findAll('.fect-badge')
    expect(els[0].attributes('type-data')).toBe('default')
    expect(els[1].attributes('type-data')).toBe('success')
    expect(els[2].attributes('type-data')).toBe('warning')
    expect(els[3].attributes('type-data')).toBe('error')
  })
  it('should be support different size', () => {
    const wrapper = mount({
      setup() {
        return { sizes: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizes.map((type) => (
              <Badge key={type} size={type}>
                {type}
              </Badge>
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    const els = wrapper.findAll('.fect-badge')
    expect(els[0].attributes('style')).toBe('font-size: 11px;')
    expect(els[1].attributes('style')).toBe('font-size: 12px;')
    expect(els[2].attributes('style')).toBe('font-size: 14px;')
    expect(els[3].attributes('style')).toBe('font-size: 16px;')
  })
  it('should render as a dot element and innerText will be null', () => {
    const dot = mount(<Badge dot>dot1234</Badge>)
    expect(dot.html()).toMatchSnapshot()
    expect(dot.find('.fect-dot')).toBeTruthy()
    expect(dot.find('.fect-dot').text()).toBe('')
  })
})
