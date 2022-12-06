import { mount } from '@vue/test-utils'
import SwipeItem from '..'

describe('SwipeItem', () => {
  it('should be render error when not have parent component', () => {
    const wrapper = mount(SwipeItem)
    expect(() => wrapper.get('div')).toThrowError()
  })
})
