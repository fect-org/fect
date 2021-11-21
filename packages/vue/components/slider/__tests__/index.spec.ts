import { Slider } from '..'
import { mount } from '@vue/test-utils'
import { trigger } from '../../../tests'

describe('Slider', () => {
  it('should render as normal', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 0,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('props should work correctly', () => {
    const wrapper = mount(Slider, {
      props: {
        hideValue: true,
        showMarkers: true,
        step: 5,
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should trigger event when click', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 0 },
    })
    const el = wrapper.find('.fect-slider')

    await el.trigger('click')
    await wrapper.setProps({ disabled: true })
    await el.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  // it('should trigger events when drag', async () => {
  //   const wrapper = mount(Slider, {
  //     props: { modelValue: 0 },
  //   })
  //   const el = wrapper.find('.fect-slider__dot')
  //   await trigger('touchstart', el, 0, 0)
  //   await trigger('touchmove', el, 50, 0)
  //   await trigger('touchend', el, 50, 0)
  //   await expect(wrapper.html()).toMatchSnapshot()
  // })
})
