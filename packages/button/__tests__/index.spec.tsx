import Button from '..'
import { mount } from '@vue/test-utils'
import { github } from '@fect-ui/vue-icons'

describe('Button', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support diferent types', async () => {
    const wrapper = mount({
      data() {
        return { ghost: false }
      },
      template: `
      <div class="container">
        <fe-button type="default" :ghost="ghost">Button</fe-button>
        <fe-button type="success" :ghost="ghost">Button</fe-button>
        <fe-button type="warning" :ghost="ghost">Button</fe-button>
        <fe-button type="error" :ghost="ghost">Button</fe-button>
      </div>`,
      components: {
        [Button.name]: Button,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({ ghost: true })
    expect(wrapper.findAll('.is-ghost').length).toEqual(4)
  })
  it('should be support different sizes', () => {
    const wrapper = mount({
      template: `
      <div class="container">
        <fe-button size="mini">Button</fe-button>
        <fe-button size="small">Button</fe-button>
        <fe-button size="medium">Button</fe-button>
        <fe-button size="large">Button</fe-button>
        <fe-button auto>Button</fe-button>
      </div>`,
      components: {
        [Button.name]: Button,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be support loadType and loadColor follow button color', () => {
    const wrapper = mount({
      template: `
      <div class="container">
        <fe-button loading>Button</fe-button>
        <fe-button loading type="success" load-type="cube">Button</fe-button>
        <fe-button loading type="warning" load-type="wave">Button</fe-button>
      </div>`,
      components: {
        [Button.name]: Button,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.loading__cube')).toBeTruthy()
    expect(wrapper.findAll('.loading__wave')).toBeTruthy()
  })
  it('should be allow some status ', () => {
    const wrapper = mount({
      template: `
      <div class="container">
        <fe-button disabled>Button</fe-button>
        <fe-button shadow>Button</fe-button>
      </div>`,
      components: {
        [Button.name]: Button,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be support icon', () => {
    const wrapper = mount({
      data: () => ({
        icon: () => <github />,
      }),
      template: `
      <div class="container">
        <fe-button :icon="icon()">Button</fe-button>
      </div>`,
      components: {
        [Button.name]: Button,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should only emit event when button status not be loading or disabled', async () => {
    const wrapper = mount(Button)
    const el = wrapper.find('.fect-button')
    await el.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    await wrapper.setProps({ disabled: true })
    await el.trigger('click')
    console.log(wrapper.emitted('click'))
    expect(wrapper.emitted('click'))
    await wrapper.setProps({ loading: true })
    await el.trigger('click')
    expect(wrapper.emitted('click'))
  })
})
