import { mount } from '@vue/test-utils'
import Rating from '../index'
import { github } from '@fect-ui/vue-icons'

describe('Rating', () => {
  it('should be render as a element', () => {
    const wrapper = mount(Rating)
    expect(() => wrapper.unmount).not.toThrow()
  })

  it('should be support custom Icon render', () => {
    const custom = () => <github />
    const wrapper = mount(Rating, {
      props: {
        icon: custom(),
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be support different types', () => {
    const _success = mount(Rating, {
      props: {
        type: 'success',
      },
    })

    const _warn = mount(Rating, {
      props: {
        type: 'warning',
      },
    })

    const _error = mount(Rating, {
      props: {
        type: 'error',
      },
    })

    const _other = mount(Rating, {
      props: {
        type: undefined,
      },
    })

    expect(_success.html()).toMatchSnapshot()
    expect(_warn.html()).toMatchSnapshot()
    expect(_error.html()).toMatchSnapshot()
    expect(_other.html()).toMatchSnapshot()
  })

  it('should be support custom count & lock', () => {
    const wrapper = mount(Rating, {
      props: {
        count: 3,
        locked: true,
      },
    })
    expect(wrapper.findAll('.fect-rating__box').length).toBe(3)
    expect(wrapper.findAll('.is-locked')).toBeTruthy()
  })

  it('should be acitved', async () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 3,
      },
    })
    expect(wrapper.findAll('.hoverd').length).toEqual(3)
  })

  it('should be support change Event', async () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 0,
      },
    })

    const els = wrapper.findAll('.fect-rating__box')
    await els[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([2])
    await wrapper.setProps({ modelValue: 2 })
    expect(wrapper.emitted('change')![0]).toEqual([2])
  })

  it('when trigger mouseenvt , should be actived', async () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 0,
      },
    })

    const els = wrapper.findAll('.fect-rating__box')
    await els[1].trigger('mouseenter')
    expect(wrapper.find('.hoverd').exists()).toBe(true)
    await els[1].trigger('mouseleave')
    expect(wrapper.find('.hoverd').exists()).toBe(false)
  })

  it('should disabled all event when set locked', async () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 0,
        locked: true,
      },
    })
    const els = wrapper.findAll('.fect-rating__box')
    await els[1].trigger('click')
    expect(wrapper.find('.hoverd').exists()).toBe(false)
    await els[1].trigger('mouseenter')
    expect(wrapper.find('.hoverd').exists()).toBe(false)
    await els[1].trigger('mouseleave')
    expect(wrapper.find('.hoverd').exists()).toBe(false)
  })
})
