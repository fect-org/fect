import { mount } from '@vue/test-utils'
import { Github } from '@fect-ui/vue-icons'
import Button from '..'

describe('ButtonIcon', () => {
  it('icon', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Action',
        icon: () => <Github />
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
