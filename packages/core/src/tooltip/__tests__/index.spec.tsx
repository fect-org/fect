/**
 *  wrapper.emitted() does not register an emitted event
 *  if it was called by watch with immediate: true option
 *  see issue : https://github.com/vuejs/vue-test-utils-next/issues/259
 */

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { Tooltip } from '..'
import { later } from '../../../tests'

const Reference = defineComponent({
  setup() {
    return () => <div class="test-content">Tooltip Content Message</div>
  }
})

describe('Tooltip', () => {
  beforeEach(() => {
    const container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('render normal', () => {
    const wrapper = mount(Tooltip, { attachTo: document.body })
    expect(() => wrapper.unmount()).not.toThrow()
    wrapper.unmount()
  })
  it('placement', () => {
    const wrapper = mount(Tooltip, {
      props: {
        teleport: '#container',
        placement: 'bottom',
        visible: true
      },
      slots: {
        default: () => <div>Action</div>,
        content: () => <Reference />
      }
    })
    const refernce = wrapper.getComponent(Reference)
    expect(refernce.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  it('trigger', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        teleport: '#container',
        trigger: 'hover'
      },
      slots: {
        default: () => <div>Action</div>,
        content: () => <Reference />
      }
    })
    const draft = wrapper.find('.fect-tooltip')
    await draft.trigger('mouseenter')
    await later(1000)
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(wrapper.vm.tooltipVisible.value).toBeTruthy()
    await draft.trigger('mouseleave')
    await later(1000)
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(wrapper.vm.tooltipVisible.value).toBeFalsy()
    wrapper.unmount()
  })
  it('disabled', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        teleport: '#container',
        disabled: true
      },
      slots: {
        default: () => <div>Action</div>,
        content: () => <Reference />
      }
    })
    const draft = wrapper.find('.fect-tooltip')
    await draft.trigger('click')
    await later(1000)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(wrapper.vm.tooltipVisible.value).toBeFalsy()
  })
  it('visible can be modify outside', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        teleport: '#container'
      },
      slots: {
        default: () => <div>Action</div>,
        content: () => <Reference />
      }
    })
    await wrapper.setProps({ visible: true })
    await later(1000)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(wrapper.vm.tooltipVisible.value).toBeTruthy()
    const draft = wrapper.find('.fect-tooltip')
    await draft.trigger('click')
    expect(wrapper.emitted('update:visible')).toBeTruthy()
  })
})
