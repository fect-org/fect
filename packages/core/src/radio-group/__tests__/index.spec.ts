import { mount } from '@vue/test-utils'
import Radio from '../../radio'
import RadioGroup from '../index'

describe('Radio', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Radio)
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('should be support modelVaue to control initial checked', () => {
    const wrapper = mount({
      components: {
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup
      },
      data() {
        return { val: '1' }
      },
      template: `
      <div class="container">
        <fe-radioGroup v-model="val">
          <fe-radio value="1">Test</fe-radio>
          <fe-radio value="2">Test1</fe-radio>
        </fe-radioGroup> 
      </div>
      `
    })
    expect(wrapper.find('.fect-radio__point--active').exists()).toBe(true)
  })

  it('should be support noraml props like size , disabled , useRow', () => {
    const wrapper = mount({
      components: {
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup
      },
      data() {
        return { size: 'mini', useRow: true, disabled: true }
      },
      template: `
      <div class="container">
        <fe-radioGroup :size="size" :useRow="useRow" :disabled="disabled">
          <fe-radio value="1">Test</fe-radio>
          <fe-radio value="2">Test1</fe-radio>
        </fe-radioGroup> 
      </div>
      `
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be emit update:checked when only use radio and unset disabled', async () => {
    const wrapper = mount(Radio, {
      props: {
        value: '1',
        checked: false,
        disabled: false
      }
    })
    const el = wrapper.find('input')
    await el.trigger('change')
    expect(wrapper.emitted('update:checked')![0]).toEqual([true])
  })

  it('should emit update:modelValue in radio group', async () => {
    const wrapper = mount({
      components: {
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup
      },
      data() {
        return { val: '1' }
      },
      template: `
      <div class="container">
        <fe-radioGroup v-model="val">
          <fe-radio value="1">Test</fe-radio>
          <fe-radio value="2">Test1</fe-radio>
        </fe-radioGroup> 
      </div>
      `
    })
    const el = wrapper.findAll('input')
    const els = wrapper.findAll('.fect-radio__point')
    await el[1].trigger('change')
    expect(els[1].attributes('class')).toContain('fect-radio__point--active')
  })

  it('should be disabled all event when set props disabled', async () => {
    const wrapper = mount(Radio, {
      props: {
        value: 1,
        disabled: true
      }
    })
    const el = wrapper.find('input')
    await el.trigger('change')
    expect(wrapper.emitted('change')).not.toBeTruthy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })
})
