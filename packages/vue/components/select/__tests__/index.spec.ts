import { mount } from '@vue/test-utils'
import Select from '..'
import Option from '../../select-option'

const Wrapper = {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      val: '',
      placeholder: '摸鱼是肯定的要摸鱼的',
      multiple: false,
      clearable: true,
      disabled: false,
      size: 'medium',
      childrenDisabled: false,
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
    `,
}

describe('Select', () => {
  it('should be render as a element', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      selectRef: { setTeleport },
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('component props should be work correctly', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      selectRef: { setTeleport },
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const selectEl = wrapper.find('.fect-select')
    await selectEl.trigger('click')
    await wrapper.setData({ size: 'mini', disabled: true })
    expect(selectEl.attributes('data-size')).toBe('mini')
    await wrapper.setData({ size: 'xxx', disabled: false })
    expect(selectEl.attributes('style')).toContain('--select-fontSize: 14px;')
    await wrapper.setData({ val: ['1', '2'], multiple: true })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('clean icon should be work', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    const {
      selectRef: { setTeleport },
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const optionEls = wrapper.findAll('.fect-option')
    await optionEls[0].trigger('click')
    const selectInputEl = wrapper.find('.value')
    expect(selectInputEl.exists()).toBeTruthy()
    expect(selectInputEl.text()).toBe('吃饭')
    const selectEl = wrapper.find('.fect-select')
    await selectEl.trigger('mouseenter')
    await selectEl.trigger('mouseleave')
    await selectEl.trigger('mouseenter')
    const el = wrapper.find('.fect-select__clearIcon')
    await el.trigger('click')
    await wrapper.setData({ multiple: true, val: [] })
    await optionEls[0].trigger('click')
    await optionEls[1].trigger('click')
    const multipleEls = wrapper.findAll('.fect-select__clearIcon')
    await multipleEls[1].trigger('click')
    expect(wrapper.vm.val).toEqual(['1'])
    await wrapper.setData({ childrenDisabled: true })
    await optionEls[1].trigger('click')
    await wrapper.setData({ disabled: true })
    await selectEl.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('useClickAway should be work', async () => {
    const wrapper = mount(Wrapper, { attachTo: document.body })
    await wrapper.setData({ multiple: true, val: [] })
    const {
      selectRef: { setTeleport },
    } = wrapper.vm.$refs as any
    await setTeleport('.container')
    const selectEl = wrapper.find('.fect-select')
    const inputEl = wrapper.find('input')
    await selectEl.trigger('click')
    expect(inputEl.attributes('aria-expanded')).toBe('true')
    const containerEl = wrapper.find('.container')
    await containerEl.trigger('click')
    expect(inputEl.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })
  it('when in multiply , initial value as empty should render placeholder', () => {
    const wrapper = mount(Select, {
      props: {
        multiple: true,
        modelValue: [],
      },
    })
    expect(wrapper.find('.fect-select__placeholder').exists()).toBeTruthy()
  })
})
