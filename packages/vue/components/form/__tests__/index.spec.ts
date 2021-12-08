import { mount } from '@vue/test-utils'
import { Form } from '../index'
import { FormItem } from '../../form-item'

describe('Form', () => {
  it('props should work correctly', async () => {
    const wrapper = mount(Form, {
      props: {
        labelPosition: 'left',
        labelWidth: '110',
        inline: true
      },
      slots: {
        default: () => FormItem
      }
    })

    await wrapper.setProps({ inline: false })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should wrok normal', () => {
    const wrapper = mount({
      components: {
        [FormItem.name]: FormItem,
        [Form.name]: Form
      },
      template: `<fe-form label-width="120px">
         <fe-form-item label-width="100" label-position="top">1</fe-form-item>
         <fe-form-item label-width="10" label-position="left">2</fe-form-item>
         <fe-form-item >3</fe-form-item>
      </fe-form>`
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('form-item only work in form ', () => {
    const wrapper = mount(FormItem, {})
    expect(() => wrapper.get('.fect-form-item')).toThrowError()
  })
})
