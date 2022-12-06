import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { Github } from '@fect-ui/vue-icons'
import Rating from '..'

import type { Ref } from 'vue'

describe('Rating', () => {
  it('render normal', () => {
    const wrapper = mount(Rating)
    expect(wrapper.element).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })
  it('type', () => {
    const wrapper = mount({
      components: { [Rating.name]: Rating },
      template: `
        <fe-rating type="default" />
        <fe-rating type="success" />
        <fe-rating type="warning" />
        <fe-rating type="error" />
      `
    })
    expect(wrapper.find('.fect-rating--default').exists()).toBeTruthy()
    expect(wrapper.find('.fect-rating--success').exists()).toBeTruthy()
    expect(wrapper.find('.fect-rating--warning').exists()).toBeTruthy()
    expect(wrapper.find('.fect-rating--error').exists()).toBeTruthy()
  })
  it('slot', () => {
    const wrapper = mount({
      components: { [Rating.name]: Rating, Github },
      template: `
        <fe-rating>
          <template #icon>
            <github />
          </template>
        </fe-rating>
      `
    })
    expect(wrapper.findComponent(Github).exists()).toBeTruthy()
  })
  it('locked', () => {
    const wrapper = mount(Rating, {
      props: {
        locked: true
      }
    })
    const icons = wrapper.findAll('.fect-rating__box')
    icons[1].trigger('mouseenter')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignored
    expect(wrapper.vm.value.value).toBe(0)
    icons[1].trigger('mouseleave')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignored
    expect(wrapper.vm.value.value).toBe(0)
  })
  it('actived', () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 3
      }
    })
    expect(wrapper.findAll('.fect-rating__box--hover').length).toBe(3)
  })
  it('click', async () => {
    const changeEvent = jest.fn()
    const wrapper = mount({
      setup() {
        const val = ref(0)
        return { val, changeEvent }
      },
      render() {
        return <Rating modelValue={this.val} onChange={this.changeEvent} />
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    const icons = wrapper.findAll('.fect-rating__box')
    await icons[1].trigger('click')
    expect(changeEvent).toHaveBeenCalled()
  })
  it('mouse event', async () => {
    /**
     * I tried to get the rating component instance. But i can't get it like normally write
     * a component. must set a string value for the render. And get it by wrapper.vm.$refs
     * I think it's maybe a bug of vue-test-utils.
     */
    const wrapper = mount({
      setup() {
        const val = ref(0)
        const ratingRef = ref()
        return { val, ratingRef }
      },
      render() {
        return <Rating modelValue={this.val} ref="ratingRef" />
      }
    })

    const icons = wrapper.findAll('.fect-rating__box')
    await icons[2].trigger('mouseenter')
    const {
      ratingRef: { value: internalValue }
    } = wrapper.vm.$refs as {
      ratingRef: {
        value: Ref<number>
      }
    }
    expect(internalValue.value).toBe(3)
    await icons[2].trigger('mouseleave')
    expect(internalValue.value).toBe(0)
  })
})
