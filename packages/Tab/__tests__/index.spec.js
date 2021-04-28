import Tab from '../index'
import Tabs from '../../Tabs'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
describe('Tabs', () => {
  it('should be render as element', () => {
    const tabs = mount(
      <Tabs>
        <Tab title="label1"></Tab>
      </Tabs>,
    )
    expect(() => tabs.unmount()).not.toThrow()
  })

  it('should support hide divider', () => {
    const wrapper = mount(
      <Tabs hideDivider>
        <Tab title="label1"></Tab>
      </Tabs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('header').classes('hide-divider')).toBe(true)
  })

  it('should support custom active and value', async () => {
    const wrapper = mount({
      setup() {
        const active = ref('active')
        const handleChange = (e) => e
        return {
          active,
          tests: [
            { title: '1', value: 'active' },
            { title: '2', value: 'second' },
          ],
          handleChange,
        }
      },
      render() {
        return (
          <Tabs v-model={[this.active, 'active']} onChange={this.handleChange}>
            {this.tests.map((test, idx) => (
              <Tab key={idx} title={test.title} value={test.value}></Tab>
            ))}
          </Tabs>
        )
      },
    })
  })
})
