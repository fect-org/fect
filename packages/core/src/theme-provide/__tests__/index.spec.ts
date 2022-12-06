import { mount } from '@vue/test-utils'
import { ThemeProvide } from '..'

describe('ThemeProvide', () => {
  it('should be work correctly', () => {
    const wrapper = mount(ThemeProvide, {
      props: {
        vars: {
          primaryForeground: 'red'
        }
      }
    })
    const el = wrapper.find('.fect-theme__context')
    expect(el.attributes('style')).toBe('--primary-foreground: red;')
  })
  it('when user entry null or undefine should be work correctly', () => {
    const wrapper = mount(ThemeProvide, {
      props: {
        vars: null as any
      }
    })
    const el = wrapper.find('.fect-theme__context')
    expect(el.attributes('style')).toBe(undefined)
  })
  it('when user pass a kebaCase variable should be work', () => {
    const wrapper = mount(ThemeProvide, {
      props: {
        vars: {
          '--primary-foreground': 'red'
        }
      }
    })
    const el = wrapper.find('.fect-theme__context')
    expect(el.attributes('style')).toBe('--primary-foreground: red;')
  })
  it('theme-provide will preset a empty object for work', () => {
    const wrapper = mount(ThemeProvide)
    const el = wrapper.find('.fect-theme__context')
    expect(el.attributes('style')).toBe(undefined)
  })
})
