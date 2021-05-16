import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Input from '../index'

describe('Input', () => {
  it('should be render as a element', () => {
    const wrapper = mount(<Input />)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support different sizes', () => {
    const wrapper = mount({
      setup() {
        return {
          sizes: ['mini', 'small', 'medium', 'large'],
        }
      },
      render() {
        return (
          <>
            {this.sizes.map((size, idx) => (
              <Input key={idx} size={size} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with label', () => {
    const wrapper = mount(
      <Input>
        <span>Test</span>
      </Input>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('label').html()).toContain(
      '<label><span>Test</span></label>',
    )
  })
  it('should support prefix label', () => {
    const wrapper = mount(<Input prefix="Test"></Input>)
    expect(wrapper.find('.input-label').text()).toBe('Test')
  })

  it('should support suffix label', () => {
    const wrapper = mount(<Input suffix="Test"></Input>)
    expect(wrapper.find('.input-label').classes('suffix')).toBe(true)
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
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('1')
  })

  it('should support clearable', () => {
    const wrapper = mount(<Input clearable />)
    expect(wrapper.find('.input__clear-icon')).toBeTruthy()
  })

  it('should support password Icon', () => {
    const wrapper = mount(<Input type="password" />)
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
    input.element.value = 2
    input.trigger('input')
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(2)
  })
  
})
