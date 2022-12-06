import { mount } from '@vue/test-utils'
import { Select } from '..'
import type { SelectProps } from '../interface'
import { SelectOption } from '../../select-option'
import { trigger } from '../../../tests'

const _wrapper = (prop?: SelectProps) => {
  return mount({
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
  })
}

describe('Select', () => {
  it('should wrork correctly', async () => {
    const wrapper = _wrapper({ size: 'mini' })
    expect(wrapper.find('.fect-select--mini').exists()).toBe(true)
    await wrapper.trigger('click')
    const option = document.querySelector('.fect-option')!
    await trigger('click', option)
    expect(wrapper.vm.val).toBe('1')
    const contentEl = wrapper.find('.fect-select__content')
    await contentEl.trigger('mouseenter')
    expect(wrapper.find('.fect-select__arrow--clear').exists()).toBe(true)
    await contentEl.trigger('mouseleave')
    expect(wrapper.find('.fect-select__arrow--clear').exists()).toBe(false)
    await contentEl.trigger('mouseenter')
    await wrapper.find('.fect-input__icon--suffix').trigger('click')
    expect(wrapper.vm.val).toBe('')
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should support render with multiple mode', async () => {
    const wrapper = await _wrapper({ multiple: true, modelValue: '2' })
    const itemIconEl = wrapper.find('.fect-select__item svg')
    await itemIconEl.trigger('click')
    expect(wrapper.vm.val?.length).toBe(0)
    await wrapper.setData({ childrenDisabled: true })
    await wrapper.trigger('click')
    const option = document.querySelector('.fect-option')!
    await trigger('click', option)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
