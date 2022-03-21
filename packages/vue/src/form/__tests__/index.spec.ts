import { mount } from '@vue/test-utils'
import { Form } from '../index'
import { Input } from '../../input'
import { Checkbox } from '../../checkbox'
import { CheckboxGroup } from '../../checkbox-group'
import { Select } from '../../select'
import { SelectOption } from '../../select-option'
import { Radio } from '../../radio'
import { RadioGroup } from '../../radio-group'
import { Switch } from '../../switch'
import { FormItem } from '../../form-item'
import { assign } from '../../utils'
import { trigger } from '../../../tests'

const registerComponent = (components: any[]) => components.reduce((acc, cur) => assign(acc, { [cur.name]: cur }), {})

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

  it('should work correctly ', async () => {
    const wrapper = mount({
      data() {
        return {
          formValue: {
            input: '',
            box: []
          },
          rules: {
            input: [
              {
                required: true,
                message: 'Please input your nick name as Kanno',
                validate: (val: string) => val === 'kanno'
              }
            ],
            box: {
              required: true,
              type: 'array',
              message: 'Please choose the direction you are interested in',
              validate: (val: string[]) => val.includes('font-end')
            }
          }
        }
      },
      components: registerComponent([Form, FormItem, Input, Checkbox, CheckboxGroup]),
      template: `<fe-form ref="formRef" label-width="120px" :model="formValue" show-message :rules="rules" size="large">
         <fe-form-item label="Input" prop="input">
         <fe-input v-model="formValue.input" placeholder="input your nick name"></fe-input>
         </fe-form-item>
         <fe-form-item label="CheckGroup" prop="box">
          <fe-checkbox-group v-model="formValue.box" use-row>
            <fe-checkbox label="font-end">font-end</fe-checkbox>
            <fe-checkbox label="back-end">back-end</fe-checkbox>
          </fe-checkbox-group>
         </fe-form-item>
      </fe-form>`
    })

    const {
      formRef: { validate, validateField, clearValidate }
    } = wrapper.vm.$refs as any
    const checkboxEls = wrapper.findAll('[type="checkbox"]')
    const inputEl = wrapper.find('[type="text"]')
    await checkboxEls[1].trigger('change')
    await clearValidate()
    ;(inputEl.element as any).value = '1'
    await inputEl.trigger('input')
    await inputEl.trigger('change')
    await clearValidate(['input'])
    ;(inputEl.element as any).value = 'kanno'
    await inputEl.trigger('input')
    await inputEl.trigger('change')
    await checkboxEls[0].trigger('change')
    const state = await validate()
    expect(state).toBe(true)
    ;(inputEl.element as any).value = 'kanno1'
    await inputEl.trigger('input')
    await inputEl.trigger('change')
    validateField('input', (state: boolean) => expect(state).toBe(false))
  })
  it('should be work with select and radiobox', async () => {
    const wrapper = mount({
      data() {
        return {
          formValue: {
            input: '',
            radio: '',
            switch: ''
          },
          rules: {
            input: [
              {
                required: true,
                message: 'Please input your nick name as Vue',
                validate: (val: string) => val === 'vue'
              }
            ]
          },
          radioRules: {
            radio: {
              required: true,
              message: 'Please choose kanno',
              validate: (val: string) => val === 'kanno'
            }
          }
        }
      },
      components: registerComponent([Form, FormItem, Select, SelectOption, Radio, RadioGroup, Switch]),
      template: `<fe-form ref="formRef" label-width="120px" :model="formValue" show-message :rules="rules" size="large">
         <fe-form-item label="Input" prop="input">
         <fe-select v-model="formValue.input">
           <fe-option label="Vue" value="vue" />
           <fe-option label="Koa" value="koa" />
         </fe-select>
         </fe-form-item>
         <fe-form-item label="CheckGroup" prop="box" :rules="radioRules" required>
          <fe-radio-group v-model="formValue.radio" use-row>
            <fe-radio value="xeryYue">test1</fe-radio>
            <fe-radio value="kanno">test2</fe-radio>
          </fe-radio-group>
         </fe-form-item>
         <fe-form-item label="Switch" prop="switch">
          <fe-switch v-model="formValue.switch" />
       </fe-form-item>
      </fe-form>`
    })

    const radioEls = wrapper.findAll('[type="radio"]')
    const selectEl = wrapper.find('.fect-select')
    await radioEls[0].trigger('change')
    await selectEl.trigger('click')
    const option = document.querySelector('.fect-option')!
    await trigger('click', option)
    const switchEl = wrapper.find('[type="checkbox"]')
    await switchEl.trigger('change')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
