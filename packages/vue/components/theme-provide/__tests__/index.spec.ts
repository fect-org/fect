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
})
