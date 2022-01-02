import { mount } from '@vue/test-utils'
import { Select } from '..'
import type { SelectProps } from '../interface'
import { SelectOption } from '../../select-option'

const _wrapper = (prop?: SelectProps) => {
  return mount(
    {
      components: {
        [SelectOption.name]: SelectOption,
        [Select.name]: Select
      },
      data() {
        return {
          val: '' || prop?.modelValue,
          placeholder: 'mock placeholder test',
          multiple: prop?.multiple || false,
          clearable: true,
          disabled: prop?.disabled || false,
          size: prop?.size || 'medium',
          childrenDisabled: false
        }
      },
      template: `
        <div class="container">
         <fe-select
         ref="selectRef"
         v-model="val"
         :multiple="multiple"
         :placeholder="placeholder"
         :disabled="disabled"
         :clearable="clearable"
         :size="size"
         :data-size="size"
         >
           <fe-option label="吃饭" value="1"></fe-option>
           <fe-option label="摸鱼" value="2" :disabled="childrenDisabled"></fe-option>
         </fe-select>
        </div>
        `
    },
    { attachTo: document.body }
  )
}

describe('Select', () => {
  it('select props should be work correctly', async () => {
    const wrapper = _wrapper({ size: 'mini' })
    const {
      selectRef: { setTeleport }
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const selectEl = wrapper.find('.fect-select')
    expect(selectEl.attributes('data-size')).toBe('mini')
    await wrapper.setData({ size: 'xxx' })
    expect(selectEl.attributes('style')).toContain('--select-fontSize: 14px;')
    await wrapper.setData({ childrenDisabled: true })
    await selectEl.trigger('click')
    const optionEls = wrapper.findAll('.fect-option')
    for (let i = 0; i < optionEls.length; i++) {
      await optionEls[i].trigger('click')
    }
    const selectInputEl = wrapper.find('.value')
    expect(selectInputEl.text()).toBe('吃饭')
    await selectEl.trigger('mouseenter')
    const clearIconEl = wrapper.find('.fect-select__clearIcon')
    await clearIconEl.trigger('click')
    expect(wrapper.vm.val).toBe('')
    await selectEl.trigger('mouseleave')
    await wrapper.setData({ disabled: true })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  it('Should support multiple mode in select component', async () => {
    const wrapper = _wrapper({ multiple: true, modelValue: [] })
    const {
      selectRef: { setTeleport }
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const selectEl = wrapper.find('.fect-select')
    await selectEl.trigger('click')
    const optionEls = wrapper.findAll('.fect-option')
    for (let i = 0; i < optionEls.length; i++) {
      await optionEls[i].trigger('click')
    }
    expect(wrapper.vm.val).toEqual(['1', '2'])
    const multipleEls = wrapper.findAll('.fect-select__clearIcon')
    await multipleEls[1].trigger('click')
    expect(wrapper.vm.val).toEqual(['1'])
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should close Select component when trigger click event outside of select', async () => {
    const wrapper = _wrapper({ disabled: true })
    const {
      selectRef: { setTeleport }
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const selectEl = wrapper.find('.fect-select')
    const inputEl = wrapper.find('input')
    await selectEl.trigger('click')
    expect(inputEl.attributes('aria-expanded')).toBe('false')
    await wrapper.setData({ disabled: false })
    await selectEl.trigger('click')
    expect(inputEl.attributes('aria-expanded')).toBe('true')
    const containerEl = wrapper.find('.container')
    await containerEl.trigger('click')
    expect(inputEl.attributes('aria-expanded')).toBe('false')
  })
})
