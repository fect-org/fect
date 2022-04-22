import { mount } from '@vue/test-utils'
import Input from '..'
import { Github } from '@fect-ui/vue-icons'

describe('Input', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: ''
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('normal props should work correctly', async () => {
    const wrapper = mount({
      components: {
        [Input.name]: Input
      },
      data() {
        return {
          suffix: '',
          prefix: '',
          disabled: false,
          readonly: false,
          clearable: false,
          type: 'password'
        }
      },
      template: `
          <div>
            <fe-input size="mini" :suffix="suffix" :prefix="prefix"
             :disabled="disabled" :clearable="clearable" 
             :type="type"
             placeholder="This is a test message">
              <span>Test</span>
            </fe-input>
          </div>
        `
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('label').html()).toContain('<label><span>Test</span></label>')
    await wrapper.setData({ disabled: true })
    expect(wrapper.find('.disabled').exists()).toBe(true)
  })

  it('when input focus should change border color', async () => {
    const wrapper = mount(Input)
    const el = wrapper.find('input')
    await el.trigger('focus')
    expect(wrapper.find('.fect-input__wrapper--hover').exists()).toBe(true)
    await el.trigger('blur')
    expect(wrapper.find('.fect-input__wrapper--hover').exists()).toBe(false)
  })

  it('when type as passowrd when trigger icon should be text', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '123456',
        type: 'password'
      }
    })

    const el = wrapper.find('.fect-input__icon')
    await el.trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
    await el.trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('should be support prefix and suffix label', () => {
    const wrapper = mount({
      template: `
      <div>
        <fe-input suffix="Suffix" prefix="Prefix"  />
      </div>
      `,
      components: {
        [Input.name]: Input
      }
    })
    expect(wrapper.find('.fect-input__label--prefix').exists()).toBe(true)
    expect(wrapper.find('.fect-input__label--suffix').exists()).toBe(true)
  })

  it('should support render prefix and suffix icon', () => {
    const wrapper = mount({
      components: {
        [Input.name]: Input,
        Github
      },
      template: `
        <div>
          <fe-input>
            <template #prefix-icon><Github/></template>
            <template #suffix-icon><Github/></template>
          </fe-input>
        </div>
      `
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('clearHandler should be work', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 333,
        clearable: true
      }
    })
    const el = wrapper.find('.fect-input__icon--suffix')
    await el.trigger('click')
    const emited = wrapper.emitted('update:modelValue')![0] as any
    expect(emited[0]).toBe('')
    await wrapper.setProps({ modelValue: '' })
    expect(wrapper.find('svg').exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('changeHandler should be work', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 333,
        type: 'number'
      }
    })
    const input = wrapper.find('input')
    input.element.value = '2'
    await input.trigger('input')
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
    expect(wrapper.emitted()).toHaveProperty('change')
  })
})
