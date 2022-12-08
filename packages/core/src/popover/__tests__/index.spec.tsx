import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { Popover } from '..'
import { later } from '../../../tests'

const Reference = defineComponent({
  setup() {
    return () => <div class="test-popover">Tooltip Popover Message</div>
  }
})

describe('Popover', () => {
  beforeEach(() => {
    const container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('render normal', () => {
    const wrapper = mount(Popover, { attachTo: document.body })
    expect(() => wrapper.unmount()).not.toThrow()
    wrapper.unmount()
  })
  it('slots', async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: () => <Reference />,
        widget: () => <div>Action</div>
      }
    })
    const refernce = wrapper.getComponent(Reference)
    expect(refernce.html()).toMatchSnapshot()
    const draft = wrapper.find('.fect-tooltip')
    await draft.trigger('mouseenter')
    await later(1000)
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    wrapper.unmount()
  })
})
