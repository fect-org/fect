import { mount } from '@vue/test-utils'
import Row from '../index'

describe('Row', () => {
  it('should be render as Element', () => {
    const row = mount(Row)
    expect(row.html()).toMatchSnapshot()
    expect(() => row.unmount()).not.toThrow()
  })

  it('should be support tag', () => {
    const wrapper = mount(Row, {
      props: {
        tag: 'span',
      },
    })
    expect(wrapper.find('span')).toBeTruthy()
  })
})
