import { mount } from '@vue/test-utils'
import Button from '../index'
import { ref } from 'vue'

describe('Button', () => {
  it('should be render as Element', () => {
    const button = mount(Button)
    expect(button.html()).toMatchSnapshot()
  })

  it('should emit click event', () => {
    const button = mount(Button)
    button.trigger('click')
    expect(button.emitted('click').length).toEqual(1)
  })

  it('should no emit click event when status as disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.emitted()).toEqual({})
  })

  it('should no emit click event when sstatus as loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.emitted()).toEqual({})
  })

  it('should allowed all types', () => {
    const wrapper = mount({
      setup(props) {
        const typeList = ['default', 'success', 'warning', 'error']
        return {
          typeList,
        }
      },
      render(h) {
        return (
          <>
            {this.typeList.map((item) => (
              <Button type={item} />
            ))}
          </>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should allowed all size', () => {
    const wrapper = mount({
      setup(props) {
        const sizeList = ['mini', 'small', 'medium', 'large']
        return {
          sizeList,
        }
      },
      render(h) {
        return (
          <>
            {this.sizeList.map((item) => (
              <Button type={item} />
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should be support default render', async () => {
    const wrapper = mount({
      setup() {
        const val = ref(0)
        const handlerClick = () => (val.value = 1)
        return { val, handlerClick }
      },
      render() {
        return <Button onClick={this.handlerClick}>{this.val}</Button>
      },
    })

    expect(wrapper.find('.fay-btn').text()).toBe('0')
    await wrapper.find('.fay-btn').trigger('click')
    expect(wrapper.find('.fay-btn').text()).toBe('1')
  })
})
