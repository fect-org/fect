import { Popover } from '..'
import { flushPromises, mount } from '@vue/test-utils'
import { later } from '../../../tests'

const Wrapper = {
  components: {
    [Popover.name]: Popover
  },
  data() {
    return { visible: false }
  },
  template: `<div class="container">
    <fe-popover 
     ref="popoverRef"
    v-model:visible="visible" type="click">
    123hhh    
    <template #widget>
      123
      </template>
    </fe-popover>
  </div>`
}

describe('Popover', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: () => 123,
        widget: () => 456
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be work correctly', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      popoverRef: { changeHandler }
    } = wrapper.vm.$refs as any
    await changeHandler(true)
    await flushPromises()
    await later()
    expect(wrapper.vm.visible).toBe(true)
    await changeHandler(false)
    await flushPromises()
    await later()
    expect(wrapper.vm.visible).toBe(false)
  })
})
