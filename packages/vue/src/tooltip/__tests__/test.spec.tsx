/**
 *  wrapper.emitted() does not register an emitted event
 *  if it was called by watch with immediate: true option
 *  see issue : https://github.com/vuejs/vue-test-utils-next/issues/259
 */

import { flushPromises, mount } from '@vue/test-utils'
import { Tooltip } from '..'
import { later } from '../../../tests'

const Wrapper = {
  components: {
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      visible: false
    }
  },
  template: `
  <div class="container">
   <fe-tooltip 
   ref="tooltipRef"
   v-model:visible="visible" content="testinfo" trigger="click">
    Test Data
   </fe-tooltip>
  </div>
  `
}

describe('Tooltip', () => {
  it('should be support slots content', () => {
    const wrapper = mount(Tooltip, {
      slots: {
        content: <div>test message</div>
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('bidirectional binding should be supported', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      tooltipRef: { setTeleport }
    } = wrapper.vm.$refs as any
    await setTeleport('.container')

    const el = wrapper.find('.fect-tooltip')
    await el.trigger('click')
    await flushPromises()
    await later()
    expect(wrapper.vm.visible).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
