import { mount } from '@vue/test-utils'
import Input from '..'

describe('Input', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support different sizes', () => {
    const wrapper = mount({
      template: `
      <div>
        <fe-input size="mini" placeholder="最小的" />
        <fe-input size="small" placeholder="较小的" />
        <fe-input size="medium" placeholder="中等的" />
        <fe-input size="large" placeholder="较大的" />
      </div>
      `,
      components: {
        [Input.name]: Input,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be work with label', () => {
    const wrapper = mount({
      template: `
      <div>
        <fe-input size="mini" placeholder="最小的">
         <span>Test</span>
        </fe-input>
      </div>
      `,
      components: {
        [Input.name]: Input,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('label').html()).toContain('<label><span>Test</span></label>')
  })
  it('should be support prefix and suffix label', () => {
    const wrapper = mount({
      template: `
      <div>
        <fe-input  placeholder="最小的"  suffix="Suffix" prefix="Prefix"  />
      </div>
      `,
      components: {
        [Input.name]: Input,
      },
    })
    expect(wrapper.findAll('.fect-input__label')[1].classes('suffix')).toBe(true)
  })
  it('should set input from value', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    input.element.value = '1'
    input.trigger('input')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['1'])
  })

  it('should support clearable and password icon', () => {
    const wrapper = mount(Input, {
      props: {
        clearable: true,
        type: 'password',
      },
    })
    expect(wrapper.find('.fect-input__clear-icon')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('when prpos type is number emit value should be number type', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 0,
        type: 'number',
      },
    })
    const input = wrapper.find('input')
    input.element.value = 2 as any
    input.trigger('input')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([2])
  })
  it('when type as passowrd when trigger icon should be text', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '123456',
        type: 'password',
      },
    })

    const el = wrapper.find('.fect-input__icon')
    await el.trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })
  it('input can not work on type as disabled or readonly', () => {
    const wrapper = mount({
      template: `
      <div>
        <fe-input size="mini" placeholder="最小的" disabled />
        <fe-input size="mini" placeholder="最小的" readonly />
      </div>
      `,
      components: {
        [Input.name]: Input,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('when input focus should change border color', async () => {
    const wrapper = mount(Input)
    const el = wrapper.find('input')
    await el.trigger('focus')
    expect(wrapper.find('.hover')).toBeTruthy()
    await el.trigger('blur')
    expect(wrapper.find('.hover').exists()).toBe(false)
  })
  it('clearHandler should be work', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 333,
        clearable: true,
      },
    })
    const el = wrapper.find('.fect-input__clear-icon')
    expect(wrapper.find('.visible').exists()).toBe(true)
    await wrapper.setProps({ disabled: true })
    await wrapper.find('input').trigger('change')
    expect(wrapper.find('.disabled').exists()).toBe(true)
    await wrapper.setProps({ disabled: false })
    await wrapper.find('input').trigger('change')
    await el.trigger('click')
    const emited = wrapper.emitted('update:modelValue')![0] as any
    expect(emited[0]).toBe('')
  })
})
