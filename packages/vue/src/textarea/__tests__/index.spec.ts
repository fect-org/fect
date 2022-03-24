import { mount } from '@vue/test-utils'
import Textarea from '..'

describe('Textarea', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Textarea, {
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
        [Textarea.name]: Textarea
      },
      data() {
        return {
          disabled: false,
          readonly: false
        }
      },
      template: `
          <div>
            <fe-textarea width="50px" :disabled="disabled" placeholder="This is a test message">
            </fe-textarea>
          </div>
        `
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.disabled').exists()).toBe(false)
    await wrapper.setData({ disabled: true })
    expect(wrapper.find('.disabled').exists()).toBe(true)
  })

  it('when input focus should change border color', async () => {
    const wrapper = mount(Textarea)
    const textarea = wrapper.find('textarea')
    await textarea.trigger('focus')
    expect(wrapper.find('.fect-textarea--hover').exists()).toBe(true)
    await textarea.trigger('blur')
    expect(wrapper.find('.fect-textarea--hover').exists()).toBe(false)
  })

  it('changeHandler should be work', async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'test value'
      }
    })
    const textarea = wrapper.find('textarea')
    textarea.element.value = 'test'
    await textarea.trigger('input')
    await textarea.trigger('change')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test'])
    expect(wrapper.emitted()).toHaveProperty('change')
  })
  it('props auto height should be work', async () => {
    const wrapper = mount(Textarea, {
      props: {
        autoHeight: true
      }
    })
    const textarea = wrapper.find('textarea')
    textarea.element.value = 'test'
    await textarea.trigger('input')
    await textarea.trigger('change')
    const hiddentTextAreaEl = document.querySelector('.fect-ui--textarea')!
    expect(hiddentTextAreaEl).toBeTruthy()
    await wrapper.unmount()
    expect(document.querySelector('.fect-ui--textarea')).toBeFalsy()
  })
})
