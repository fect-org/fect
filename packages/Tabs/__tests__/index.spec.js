import Tabs from '../index'
import { mount } from '@vue/test-utils'
describe('Tabs', () => {
  it('should be render as element', () => {
    const tabs = mount(<Tabs>Test</Tabs>)
    expect(() => tabs.unmount()).not.toThrow()
  })
})
