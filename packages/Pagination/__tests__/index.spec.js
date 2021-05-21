import Pagintaion from '../index'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

describe('Pagination', () => {
  it('should be render as element', () => {
    const wrapper = mount(Pagintaion)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the specified page should be activated', () => {
    const wrapper = mount(Pagintaion, {
      props: {
        count: 10,
        modelValue: 7,
      },
    })
    expect(wrapper.find('.active').text()).toEqual('7')
  })

  it('should trigger change event', async () => {
    const current = ref(1)
    const wrapper = mount(Pagintaion, {
      props: {
        modelValue: current,
        count: 10,
      },
    })
    const el = wrapper.findAll('.pagination-item__button')
    expect(wrapper.vm.modelValue).toEqual(1)
    await el[2].trigger('click')
    // expect(wrapper.vm.modelValue).toEqual(2)
    expect(wrapper.emitted().change[0]).toEqual([2])
    await el[0].trigger('click')
    expect(wrapper.vm.modelValue).toEqual(1)
    expect(wrapper.emitted().change[1]).toEqual([1])
  })

  it('should support simple mode', () => {
    const wrapper = mount(Pagintaion, {
      props: {
        simple: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should be render all pages wehen limit value is older than the count value', () => {
    const wrapper = mount(Pagintaion, {
      props: {
        limit: 11,
        count: 10,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('button').length).toBeGreaterThanOrEqual(12)
  })

  it('should be support different sizes', () => {
    const mini = mount(Pagintaion, {
      props: {
        size: 'mini',
      },
    })
    const small = mount(Pagintaion, {
      props: {
        size: 'small',
      },
    })
    const medium = mount(Pagintaion, {
      props: {
        size: 'medium',
      },
    })
    const large = mount(Pagintaion, {
      props: {
        size: 'large',
      },
    })
    expect(mini.html()).toMatchSnapshot()
    expect(small.html()).toMatchSnapshot()
    expect(medium.html()).toMatchSnapshot()
    expect(large.html()).toMatchSnapshot()
  })

  it('should be support custom slots', () => {
    const wrapper = mount({
      setup() {
        return {
          customSlots: {
            prev: <h4>Custom Prev</h4>,
            next: <h3>Custom Next</h3>,
          },
        }
      },
      render() {
        return <Pagintaion v-slots={this.customSlots} />
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('h4').text()).toBe('Custom Prev')
    expect(wrapper.find('h3').text()).toBe('Custom Next')
  })
})
