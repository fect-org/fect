import { mount as _mount } from '@vue/test-utils'
import { ref } from 'vue'
import { InputNumber } from '..'

const generatorArr = (cap: number) => new Array(cap).fill(0)

const mount = (options: Record<string, any>) =>
  _mount({
    components: {
      [InputNumber.name]: InputNumber
    },
    ...options
  }) as ReturnType<typeof _mount>

describe('InputNumber', () => {
  it('render normal', () => {
    const wrapper = mount({
      template: `
        <fe-input-number />
      `
    })
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('size', () => {
    const wrapper = mount({
      template: `
        <fe-input-number size="mini" />
        <fe-input-number size="small" />
        <fe-input-number size="medium" />
        <fe-input-number size="large" />
      `
    })
    expect(wrapper.find('.fect-input-number--mini').exists()).toBe(true)
    expect(wrapper.find('.fect-input-number--small').exists()).toBe(true)
    expect(wrapper.find('.fect-input-number--medium').exists()).toBe(true)
    expect(wrapper.find('.fect-input-number--large').exists()).toBe(true)
  })
  it('modelValue', () => {
    const wrapper = mount({
      template: `
          <fe-input-number v-model="value" />
        `,
      setup() {
        const value = ref(0)
        return { value }
      }
    })
    expect(wrapper.find('input').element.value).toEqual('0')
  })
  it('max', async () => {
    const wrapper = mount({
      template: `
        <fe-input-number v-model="value" :max="10" />
      `,
      setup() {
        const value = ref(10)
        return { value }
      }
    })
    expect(wrapper.find('input').element.value).toEqual('10')
    const increase = wrapper.find('.fect-input-number__label--suffix')
    await increase.trigger('click')
    expect(wrapper.find('input').element.value).toEqual('10')
  })
  it('min', async () => {
    const wrapper = mount({
      template: `
      <fe-input-number v-model="value" :min="10" />
    `,
      setup() {
        const value = ref(10)
        return { value }
      }
    })
    expect(wrapper.find('input').element.value).toEqual('10')
    const decrease = wrapper.find('.fect-input-number__label--prefix')
    await decrease.trigger('click')
    expect(wrapper.find('input').element.value).toEqual('10')
  })
  it('increase & decrease & step', async () => {
    const wrapper = mount({
      template: `
        <fe-input-number v-model="value" :min="1" :step="2" :max="11" />
      `,
      setup() {
        const value = ref(1)
        return { value }
      }
    })
    expect(wrapper.find('input').element.value).toEqual('1')
    const decrease = wrapper.find('.fect-input-number__label--prefix')
    const increase = wrapper.find('.fect-input-number__label--suffix')
    await increase.trigger('click')
    expect(wrapper.find('input').element.value).toBe('3')
    expect(wrapper.vm.value).toBe(3)
    await Promise.all(generatorArr(4).map(() => increase.trigger('click')))
    expect(wrapper.vm.value).toBe(11)
    await Promise.all(generatorArr(6).map(() => decrease.trigger('click')))
    expect(wrapper.find('input').element.value).toBe('1')
    expect(wrapper.vm.value).toBe(1)
  })
  it('step & precision & strictly', async () => {
    const wrapper = mount({
      template: `
          <fe-input-number v-model="value" :min="1" :step="0.5" :max="10" :precision="1" strictly />
        `,
      setup() {
        const value = ref(1)
        return { value }
      }
    })
    const increase = wrapper.find('.fect-input-number__label--suffix')
    await Promise.all(generatorArr(4).map(() => increase.trigger('click')))
    expect(wrapper.find('input').element.value).toBe('3')
  })
  it('change event', async () => {
    const wrapper = mount({
      template: `
            <fe-input-number v-model="value" :min="1" :step="0.5" :max="10" :precision="1" strictly />
          `,
      setup() {
        const value = ref(1)
        return { value }
      }
    })
    wrapper.find('input').element.value = '2'
    await wrapper.find('input').trigger('change')
    expect(wrapper.find('input').element.value).toBe('2')
  })
})
