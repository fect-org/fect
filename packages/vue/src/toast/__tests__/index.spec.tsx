import Toast from '../toast-item'
import { mount } from '@vue/test-utils'
import type { ToastInternalOptions } from '../interface'
import { noop, NormalTypes } from '../../utils'

describe('Toast', () => {
  it('render normal', () => {
    const wrapper = mount(Toast, {
      props: {
        toast: {
          text: 'Test Message',
          visible: true
        } as ToastInternalOptions
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-toast__message').text()).toBe('Test Message')
  })

  it('actions', async () => {
    const wrapper = mount(Toast, {
      props: {
        toast: {
          text: 'Test Message',
          visible: true,
          actions: 'cancel',
          cancel: noop
        } as ToastInternalOptions
      }
    })

    expect(wrapper.find('.fect-toast__action').exists()).toBeTruthy()
    // const actionEl = wrapper.find('.fect-toast__action')
  })

  it('actions custom', async () => {
    const action = () => <div class="action__self">Action</div>

    const wrapper = mount(Toast, {
      props: {
        toast: {
          text: 'Test Message',
          visible: true,
          actions: [action]
        } as ToastInternalOptions
      }
    })
    expect(wrapper.find('.action__self').exists()).toBeTruthy()
    await wrapper.setProps({
      toast: {
        visible: true,
        actions: [action, 'test']
      }
    })
    const actionContainer = wrapper.find('.fect-toast__actions')
    expect(actionContainer.element.childElementCount).toBe(1)
    await wrapper.setProps({
      toast: {
        visible: true,
        actions: []
      }
    })
    expect(wrapper.find('.fect-toast__actions').element.childElementCount).toBe(0)
  })
})
