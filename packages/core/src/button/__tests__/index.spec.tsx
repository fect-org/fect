import { mount } from '@vue/test-utils'
import Button from '..'

describe('Button', () => {
  it('render normal', () => {
    const wrapper = mount(Button)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: () => 'Action'
      }
    })
    expect(wrapper.find('.fect-button--disabled').exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('type', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Button>Default</Button>
            <Button type="abort">Abort</Button>
            <Button type="success">Success</Button>
            <Button type="success-light">Success Light</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="secondary-light">Secondary Light</Button>
            <Button type="warning">Warning</Button>
            <Button type="warning-light">Warning Light</Button>
            <Button type="error">Error</Button>
            <Button type="error-light">Error Light</Button>
          </div>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
        loadType: 'wave'
      }
    })
    expect(wrapper.find('.fect-button--loading').exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('ghost', () => {
    const wrapper = mount({
      render() {
        return (
          <div>
            <Button ghost>Default</Button>
            <Button ghost type="abort">
              Abort
            </Button>
            <Button ghost type="success">
              Success
            </Button>
            <Button ghost type="success-light">
              Success Light
            </Button>
            <Button ghost type="secondary">
              Secondary
            </Button>
            <Button ghost type="secondary-light">
              Secondary Light
            </Button>
            <Button ghost type="warning">
              Warning
            </Button>
            <Button ghost type="warning-light">
              Warning Light
            </Button>
            <Button ghost type="error">
              Error
            </Button>
            <Button ghost type="error-light">
              Error Light
            </Button>
          </div>
        )
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shadow', () => {
    const wrapper = mount(Button, {
      props: {
        shadow: true
      },
      slots: {
        default: () => 'Action'
      }
    })
    expect(wrapper.find('.fect-button--shadow').exists()).toBeTruthy()
  })

  it('auto', () => {
    const wrapper = mount(Button, {
      props: {
        auto: true
      },
      slots: {
        default: () => 'Action'
      }
    })
    expect(wrapper.find('.fect-button--auto').exists()).toBeTruthy()
  })

  it('drip', async () => {
    const clickMock = jest.fn()
    const wrapper = mount(Button, {
      props: {
        onClick: clickMock
      },
      slots: {
        default: () => 'Action'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.find('.fect-button__drip').exists()).toBeTruthy()
    await wrapper.find('.fect-button__drip').trigger('animationend')
    expect(clickMock).toHaveBeenCalled()
  })
})
